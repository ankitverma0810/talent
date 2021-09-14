# Development Environment (Local)

## Pre Installation Requirements

Install NODE.js: 

Download Node.js from https://nodejs.org/en/download/

Install Docker:

Download Docker Desktop from https://docs.docker.com/desktop/windows/install/

Enable Kubernetes:

* Docker setting
* Kubernetes
* Enable Kubernetes
* Apply & Restart

Install Ingress nginx:

Guide to install on from https://kubernetes.github.io/ingress-nginx/deploy/

Install Skaffold:

Guide to install on windows https://skaffold.dev/docs/install/


## Init

Configure the host:

* Open host file located at C:\Windows\System32\Drivers\etc\hosts 
* Add `127.0.0.1 talent.dev` and save the file

Add Secret Keys:

`kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf567rthdsy767`

Run Skaffold:

`skaffold dev`

# Usage

* Open browser and navigate to `https://talent.dev`