# React Scaffold

Demo: http://react-scaffold.tsears.dev

This is intended to serve as a starting point for creating apps using React/Typescript/Node. It runs
as two separate processes - a frontend service and a backend service.  For local development,
webpack dev server handles serving the front end, while nodemon handles running the backend service.

Dockerfiles are provided for both the frontend and backend as well.  The frontend uses a nginx to
handle serving static assets while reverse-proxying requests to the backend api.

The scaffold was build on Node 10 -- see .nvmrc.  I use [nvm](https://github.com/creationix/nvm) to
manage node versions across projects.

## Local Development

Easy

```
npm start
```

Alternatively,

```
docker-compose up
```

In either case, the application will be listening on http://localhost:9000

_TODO: I don't think the docker-compose approach will pick up changes on the server, confirm it does
for the frontend_.

## Building

_Note: replace tsears/ with your own docker id_

The application is meant to be deployed via docker, but at the end of the day the repo contains a
serviceable template for an nginx site, and the backend is just node. I personally use CICD to build
the docker images on merges to my develop branch. gitlab-ci.yml defines my CICD pipeline for the
application.

## License

MIT.  See LICENSE.
