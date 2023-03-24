FROM --platform=linux/amd64 amazonlinux:2

RUN amazon-linux-extras install -y

RUN yum update -y \
    && yum install \
        systemd \
        tar \
        unzip \
        sudo \
        git \
        gcc \
        libxslt-dev \
        libffi-dev \
        libssl-dev \
        -y

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip && sudo ./aws/install

RUN curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh" | bash \
    && . ~/.nvm/nvm.sh \
    && nvm install v16

RUN echo -e "\
export NVM_DIR=\"\$HOME/.nvm\"\n\
[ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\"\n\
" >> ~/.bashrc

# docker
RUN amazon-linux-extras install docker -yum \
    && systemctl enable docker

RUN amazon-linux-extras install -y python3.8

RUN pip3.8 install --upgrade pip

RUN pip3.8 install --user aws-sam-cli

# unzip aws-sam-cli-linux-x86_64.zip -d sam-installation && sudo ./sam-installation/install


CMD ["/sbin/init"]