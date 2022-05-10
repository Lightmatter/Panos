#!/bin/bash
set -e

bandit -r codereview/ -l -x tests.py
isort --check-only codereview/**/*.py
black --check --diff --exclude=/migrations/ codereview/
prospector -I "codereview/settings/*"
