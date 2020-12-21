# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.145.1/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 14, 12, 10
ARG VARIANT=14-buster
FROM node:${VARIANT}

# [Option] Install zsh
ARG INSTALL_ZSH="true"
# [Option] Upgrade OS packages to their latest versions
ARG UPGRADE_PACKAGES="true"

# Install needed packages, yarn, nvm and setup non-root user. Use a separate RUN statement to add your own dependencies.
ARG INSTALL_ZSH="true"
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG UPGRADE_PACKAGES="true"
ARG INSTALL_OH_MYS="true"
ARG NVM_DIR=/usr/local/share/nvm
ARG ENABLE_NONROOT_DOCKER="true"
ARG SOURCE_SOCKET=/var/run/docker-host.sock
ARG TARGET_SOCKET=/var/run/docker.sock
ARG NODE_VERSION=v10.20.1
ARG UPDATE_RC="true"

COPY library-scripts/*.sh /tmp/library-scripts/

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  # Remove imagemagick due to https://security-tracker.debian.org/tracker/CVE-2019-10131
  && apt-get purge -y imagemagick imagemagick-6-common \
  # Install common packages, non-root user, update yarn and install nvm
  && bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" "${INSTALL_OH_MYS}" \
  # Install yarn, nvm
  && rm -rf /opt/yarn-* /usr/local/bin/yarn /usr/local/bin/yarnpkg \
  && bash /tmp/library-scripts/node-debian.sh "${NVM_DIR}" "${NODE_VERSION}" "${USERNAME}" "${UPDATE_RC}" \
  && bash /tmp/library-scripts/docker-debian.sh "${ENABLE_NONROOT_DOCKER}" "${SOURCE_SOCKET}" "${TARGET_SOCKET}" "${USERNAME}" \
  # Clean up
  && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /root/.gnupg /tmp/library-scripts

# Configure global npm install location
ARG NPM_GLOBAL=/usr/local/share/npm-global
ENV PATH=${NPM_GLOBAL}/bin:${PATH}
RUN mkdir -p ${NPM_GLOBAL} \
  && chown ${USERNAME}:root ${NPM_GLOBAL} \
  && npm config -g set prefix ${NPM_GLOBAL} \
  && sudo -u ${USERNAME} npm config -g set prefix ${NPM_GLOBAL} \
  && echo "if [ \"\$(stat -c '%U' ${NPM_GLOBAL})\" != \"${USERNAME}\" ]; then sudo chown -R ${USERNAME}:root ${NPM_GLOBAL} ${NVM_DIR}; fi" \
  | tee -a /etc/bash.bashrc >> /etc/zsh/zshrc

# Install eslint
RUN sudo -u ${USERNAME} npm install -g eslint tslint typescript \
  && npm cache clean --force > /dev/null 2>&1

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

ARG EXTRA_NODE_VERSION=v14.14.0
RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

RUN su node -c "mkdir -p /home/$USERNAME/.vscode-server/extensions \
  /home/$USERNAME/.vscode-server-insiders/extensions \
  && chown -R $USERNAME \
  /home/$USERNAME/.vscode-server \
  /home/$USERNAME/.vscode-server-insiders"

ENTRYPOINT ["/usr/local/share/docker-init.sh"]

CMD ["sleep", "infinity"]

LABEL name="Node 14 / TypeScript"
LABEL version="1.0.1"
