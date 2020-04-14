from django.apps import AppConfig

class MatcherConfig(AppConfig):
    name = 'matcher'

    def ready(self):
        import matcher.signals
