# Django settings for project project.
import pathlib
from datetime import timedelta
from django.core.exceptions import ImproperlyConfigured

from environ import Env, Path

DEBUG = False


root = Path(__file__) - 3
repo_root = root - 1

env = Env(DEBUG=(bool, False))
Env.read_env(repo_root(".env"))

PROJECT_ROOT = root()
DEBUG = env("DEBUG")

ADMINS = (
    ("Ben Beecher", "Ben@Lightmatter.com"),
    ("Greg Hausheer", "Greg@Lightmatter.com"),
    ("Developer", "brian@lightmatter.com"),
)

MANAGERS = ADMINS


# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = "UTC"

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = "en"

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# URL prefix for static files.
# Example: "http://example.com/static/", "http://static.example.com/"
STATIC_URL = "/static/"

# Additional locations of static files
STATICFILES_DIRS = (str(root.path("static_source")),)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
)

MIDDLEWARE = (
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "social_django.middleware.SocialAuthExceptionMiddleware",
)

ROOT_URLCONF = "codereview.codereview.urls"

INSTALLED_APPS = (
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.admin",
    "localflavor",
    "django_extensions",
    "model_utils",
    "easy_thumbnails",
    "import_export",
    "corsheaders",
    "rest_framework",
    "rest_framework.authtoken",
    "django_filters",
    "djoser",
    "social_django",
    "codereview.home",
    "codereview.account",
    "codereview.todo",
    "codereview.util",
)

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {"require_debug_false": {"()": "django.utils.log.RequireDebugFalse"}},
    "handlers": {
        "mail_admins": {
            "level": "ERROR",
            "filters": ["require_debug_false"],
            "class": "django.utils.log.AdminEmailHandler",
        },
        "console": {"class": "logging.StreamHandler",},
    },
    "loggers": {
        "django.request": {
            "handlers": ["mail_admins", "console"],
            "level": "ERROR",
            "propagate": True,
        },
        "root": {"handlers": ["console"], "level": "ERROR",},
    },
}


AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "social_core.backends.facebook.FacebookOAuth2",
)

AUTH_USER_MODEL = "account.User"
LOGIN_REDIRECT_URL = "/"
LOGIN_URL = "/account/login/"
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True


def prefixed_cookie(name):
    return "codereview_{}".format(name)


SESSION_COOKIE_NAME = prefixed_cookie("sessionid")
CSRF_COOKIE_NAME = prefixed_cookie("csrftoken")
LANGUAGE_COOKIE_NAME = prefixed_cookie("django_language")

TEST_RUNNER = "codereview.codereview.testrunner.TestRunner"

ALLOWED_HOSTS = ["localhost" ".herokuapp.com"]


CONTEXT_PROCESSORS = [
    "django.contrib.auth.context_processors.auth",
    "django.template.context_processors.debug",
    "django.template.context_processors.request",
    "django.template.context_processors.i18n",
    "django.template.context_processors.media",
    "django.template.context_processors.static",
    "django.template.context_processors.tz",
    "django.contrib.messages.context_processors.messages",
    "codereview.home.context_processors.settings",
    "social_django.context_processors.backends",
    "social_django.context_processors.login_redirect",
]


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [root("templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "builtins": ["django.templatetags.static"],
            "context_processors": CONTEXT_PROCESSORS,
        },
    },
]

#  social
SOCIAL_AUTH_PIPELINE = (
    "social_core.pipeline.social_auth.social_details",
    "social_core.pipeline.social_auth.social_uid",
    "social_core.pipeline.social_auth.auth_allowed",
    "social_core.pipeline.social_auth.social_user",
    "social_core.pipeline.user.get_username",
    "social_core.pipeline.user.create_user",
    "social_core.pipeline.social_auth.associate_user",
    "social_core.pipeline.social_auth.load_extra_data",
    "social_core.pipeline.user.user_details",
    "social_core.pipeline.social_auth.associate_by_email",
    "account.pipeline.save_facebook_details",
)


SOCIAL_AUTH_ENABLED_BACKENDS = "facebook"
SOCIAL_AUTH_USER_MODEL = "account.User"
SOCIAL_AUTH_DEFAULT_USERNAME = "new_social_auth_user"


try:
    from model_bakery import random_gen  # noqa

    MOMMY_CUSTOM_FIELDS_GEN = {
        "localflavor.us.models.USZipCodeField": random_gen.gen_string
    }
except ImportError:
    pass

CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {
    "PAGE_SIZE": env("PAGE_SIZE", default=10),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    # Filtering/Sorting
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.OrderingFilter",
        "rest_framework.filters.SearchFilter",
    ],
}

DJOSER = {
    "SERIALIZERS": {
        "token_create": "codereview.account.serializers.TokenCreateSerializer",
    },
    "USER_CREATE_PASSWORD_RETYPE": True,
    "CREATE_SESSION_ON_LOGIN": True,
    "PASSWORD_RESET_CONFIRM_URL": "account/reset/confirm/{uid}/{token}",  # TODO: prefix with frontend url
    "PASSWORD_RESET_CONFIRM_RETYPE": True,
    "SET_USERNAME_RETYPE": True,
    "SET_PASSWORD_RETYPE": True,
}

# fmt: off
