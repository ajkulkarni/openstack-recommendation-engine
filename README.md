# OpenStack User Activity Monitoring & Recommendation

```
This is the repository for the back-end. User deployable package is here:

https://github.com/nakapika/openstack-dockerized-monitoring-app
```

Technology Stack: *NodeJS, Express, Apache Solr, MongoDB*

Monitoring activity of users in VMs deployed using OpenStack and giving relevant recommendations to help user.

Will be using the .bash_history of the user to give him helpful recommendations.

I have used Apache Solr to persist my data. For simpler use cases you can use MongoDB. I have implemented a web-service for it recommend_mongo.js.

## Installation

Install Node using NVM

To setup project: `npm install`

Install Oracle Java 8

Install Apache Solr

Create a new core in Solr called: `recommend`

## Usage

Run app.js to persist data into Apache Solr using: `PORT=4000 npm start`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
