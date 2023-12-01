FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

RUN curl -L https://fly.io/install.sh | sh

RUN echo "export FLYCTL_INSTALL=\"/home/node/.fly\"\nexport PATH=\"$FLYCTL_INSTALL/bin:$PATH\"" >> ~/.bashrc