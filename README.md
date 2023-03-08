# goder

This is a little game I'm making to keep myself busy. The global idea is it will be similar to Plague Inc., but with religions instead of deseases and procedural generation of absurd in-game entities and events.

It's in early production, for now I've just created a test game field, each cell represents a location with population, soil fertility and tech level props (which grow up depending on each other and also can affect the nearby cells' corresponding prop). Also you can create any number of religions (each with in-cell growth and virality params), set some set of religions in specific cells and watch how they spread across the world and struggle with each other - the religions set in each cell is dinamically represented with a pie chart. Though this peace of algorythms is not well done yet.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
