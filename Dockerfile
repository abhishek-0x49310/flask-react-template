FROM ubuntu:20.04
ARG DEBIAN_FRONTEND=noninteractive

# Phase 1: Install system dependencies as root.
RUN apt-get update -y && \
    apt-get install -y build-essential git curl jq \
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 \
    libnss3 libxss1 libasound2 libxtst6 xauth xvfb tzdata software-properties-common

RUN add-apt-repository ppa:deadsnakes/ppa -y && \
    apt-get update -y && \
    apt-get install python3.12 python3-pip -y && \
    pip install pipenv

RUN curl -sL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install nodejs -y

# Phase 2: Create a non-root user and set directory permissions.
RUN adduser --disabled-password --gecos "" appuser
RUN mkdir -p /app /opt/app /tmp/project_files
RUN chown -R appuser:appuser /app /opt/app /tmp/project_files

# Phase 3: Switch to the non-root user and install application dependencies.
USER appuser
WORKDIR /app

# Copy and install dependencies in the correct working directory.
COPY Pipfile Pipfile.lock ./
RUN pipenv install --dev

COPY package.json package-lock.json ./
RUN npm ci

# Copy all source code (optional, but a better approach)
COPY . .

# Build the frontend assets.
ARG APP_ENV
RUN npm run build

CMD [ "npm", "start" ]

