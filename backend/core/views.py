import json
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
from django.conf import settings
from .models import Review

@csrf_exempt
@require_POST
def contact(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
    except Exception:
        return JsonResponse({'error': 'JSON inválido'}, status=400)

    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()
    message = (data.get('message') or '').strip()
    subject = (data.get('subject') or 'Nuevo mensaje de contacto').strip()

    if not name or not email or not message:
        return JsonResponse({'error': 'Faltan campos requeridos'}, status=400)

    recipient = getattr(settings, 'CONTACT_RECIPIENT', '')
    if not recipient:
        return JsonResponse({'error': 'CONTACT_RECIPIENT no está configurado'}, status=500)

    body = f"Nombre: {name}\nEmail: {email}\n\nMensaje:\n{message}"
    mail = EmailMessage(
        subject=subject,
        body=body,
        from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', None),
        to=[recipient],
        reply_to=[email] if email else None,
    )

    try:
        mail.send(fail_silently=False)
    except Exception as e:
        return JsonResponse({'error': 'No se pudo enviar el correo'}, status=500)

    return JsonResponse({'ok': True})

# Reviews endpoints
@csrf_exempt
@require_http_methods(["GET"])
def get_reviews(request):
    """Get all approved reviews"""
    try:
        reviews = Review.objects.filter(is_approved=True).values(
            'id', 'name', 'rating', 'comment', 'created_at'
        )
        reviews_list = list(reviews)
        
        # Format datetime to ISO string
        for review in reviews_list:
            review['created_at'] = review['created_at'].isoformat()
        
        return JsonResponse({'reviews': reviews_list}, status=200)
    except Exception as e:
        return JsonResponse({'error': 'Error al obtener las reseñas'}, status=500)

@csrf_exempt
@require_POST
def create_review(request):
    """Create a new review"""
    try:
        data = json.loads(request.body.decode('utf-8'))
    except Exception:
        return JsonResponse({'error': 'JSON inválido'}, status=400)
    
    name = (data.get('name') or '').strip()
    rating = data.get('rating')
    comment = (data.get('comment') or '').strip()
    
    # Validation
    if not name or not comment:
        return JsonResponse({'error': 'Nombre y comentario son requeridos'}, status=400)
    
    if not rating or not isinstance(rating, int) or rating < 1 or rating > 5:
        return JsonResponse({'error': 'Calificación debe ser entre 1 y 5'}, status=400)
    
    if len(name) > 100:
        return JsonResponse({'error': 'El nombre es muy largo (máximo 100 caracteres)'}, status=400)
    
    try:
        review = Review.objects.create(
            name=name,
            rating=rating,
            comment=comment,
            is_approved=True
        )
        
        return JsonResponse({
            'ok': True,
            'review': {
                'id': review.id,
                'name': review.name,
                'rating': review.rating,
                'comment': review.comment,
                'created_at': review.created_at.isoformat()
            }
        }, status=201)
    except Exception as e:
        return JsonResponse({'error': 'Error al crear la reseña'}, status=500)
