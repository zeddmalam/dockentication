# Dockentication

Is a container with node js proxy server which provides out of the box authentication for your application. 

## Configuration

In docker-compose.yaml you need to configure the name of network where dockenticator should be placed.

Then all the env vars should be set.

## Usage

Dockentication sends request to `auth endpoint` with `Authorization` header which is provided in request.

If `auth endpoint` returns successfull status, then request is proxified to the next host:port.

## Build

```
docker-compose build
```

# Run

```
docker-compose up
```

## Environmental variables

* `DOCKENTICATION_PORT` -- port where dockentication accepts requests
* `DOCKENTICATION_NEXT_HOST` -- host for proxified request after successfull authentication
* `DOCKENTICATION_NEXT_PORT` -- port for proxified request after successfull authentication
* `API_OAUTH_AUTHORIZE` -- auth endpoint

