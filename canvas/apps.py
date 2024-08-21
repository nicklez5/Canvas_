from django.apps import AppConfig


class CanvasConfig(AppConfig):
    name = 'canvas'

    def ready(self):
        import canvas.signals 