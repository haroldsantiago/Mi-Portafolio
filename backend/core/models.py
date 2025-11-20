from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Review(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name="Calificación"
    )
    comment = models.TextField(verbose_name="Comentario")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    is_approved = models.BooleanField(default=True, verbose_name="Aprobado")
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Reseña"
        verbose_name_plural = "Reseñas"
    
    def __str__(self):
        return f"{self.name} - {self.rating} estrellas"
