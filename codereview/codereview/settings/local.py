from corsheaders.defaults import default_headers

from .base import *

# if you want to test with debug off
env.read_env(repo_root(".env"), SECRET_KEY="changeme")  # nosec

ALLOWED_HOSTS = [u"127.0.0.1", "localhost", "localhost:8000"]
DEBUG = True


DATABASES = {"default": env.db()}

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "unique-snowflake",
    }
}

MEDIA_ROOT = root("media")
MEDIA_URL = "http://127.0.0.1:8000/media/"

STATIC_ROOT = root("static")

CORS_ORIGIN_WHITELIST = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]

CORS_ALLOW_HEADERS = list(default_headers) + [
    "Cache-Control",
]

# CSRF_TRUSTED_ORIGINS = ["localhost:3000"]

CORS_ALLOW_CREDENTIALS = True

INSTALLED_APPS += ("debug_toolbar",)

MIDDLEWARE += ("debug_toolbar.middleware.DebugToolbarMiddleware",)

DEBUG_TOOLBAR_CONFIG = {"INTERCEPT_REDIRECTS": False}

INTERNAL_IPS = ("127.0.0.1",)

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


class InvalidVariable(str):
    def __bool__(self):
        return False


TEMPLATES[0]["OPTIONS"]["debug"] = True
TEMPLATES[0]["OPTIONS"]["string_if_invalid"] = InvalidVariable(
    "BAD TEMPLATE VARIABLE: %s"
)

SECRET_KEY = env("SECRET_KEY")
CELERY_ALWAYS_EAGER = True
CELERY_EAGER_PROPAGATES_EXCEPTIONS = True

DEFAULT_FROM_EMAIL = "hello@codereview.com"
SERVER_EMAIL = "error@codereview.com"
