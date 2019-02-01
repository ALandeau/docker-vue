# Projet Docker - Simple ToDo application

## Informations
Notre application ToDo vous servira à organiser vos journées de travail au mieux. Vous pouvez ajouter, terminer et supprimer vos tâches.
Cette application repose sur plusieurs containers Docker : 
* Redis
* RedisCommander
* API (Node.js)
* Application front (Vue.js)

Nous partons du principe que vous avez déjà `docker` et `docker-compose` installés sur votre machine. Si ce n’est pas le cas, veuillez suivre les instruction de la documentation : https://docs.docker.com/install/.

Pour commencer à développer sur l’application, ouvrez votre terminal et exécutez la commande suivante : `docker-compose up`

_Info_: les données de Vue.js sont gérées par VueX et les requêtes API sont prises en charge par Axios. 
`docker-compose up` lance également le module de hot reload (`HMR`) intégré à Vue. Cela vous permet donc de commencer à développer immédiatement, toute modification apportée aux fichiers déclenchera automatiquement le rechargement intelligent de votre navigateur.

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


### Contributeurs
* Alex Landeau
* Alexandre Payen
* Bertrand Guy
* Antoine Piché