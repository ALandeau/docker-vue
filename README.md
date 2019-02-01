# Projet Docker 

## Informations
Notre application TODO repose sur plusieurs containers Docker : 
* Redis
* RedisCommander
* API (Node.js)
* Application front (Vue.js)

Nous partons du principe que vous avez déjà `docker` et `docker-compose` installés sur votre machine. Si ce n’est pas le cas, veuillez suivre les instruction de la documentation : https://docs.docker.com/install/.

Pour commencer à développer sur l’application, ouvrez votre terminal et exécutez la commande suivante : 
`docker-compose up -d`

----
##### Liste des ports utilisés
| Service | Port |
| --- | :---: |
| Node API | 3000 |
| Redis | 6379 |
| Node VueJS | 8080 |
| Redis Commander | 8081 |

----
##### Version des services
| Service | Version |
| --- | :---: |
| Node API | node:8 |
| Redis | latest |
| Node VueJS | node:8 |
| Redis Commander | latest |
| VuesJS | 2.5.17 |


## Documentation API
https://documenter.getpostman.com/view/3427665/Rztmron1


