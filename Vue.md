# Introduction

## Angular 
- developed by Google in 2010, got updated to Angular (2) in 2016; now it's a typescript based JS framework
- is a framework; is feature reach
- everything is buit in 

## React   
- developed at Facebook in 2013
- is the exact opposite of angular
- only gives the view, the UI layer to build frontend applications
- had less features, but more options

## Vue     
- came into scene in 2014
- it was created by a single developer
- he tried to combine the previous two into something better.
- it's the best of both world - some are built in (i.e it gives routing, state management);
- but some aren't buit in, so you get to decide how you want to build it (i.e forms)

## Comparison
- all of them want to change the UI, manipulate the DOM to make apps interactive
- to answer which one is better, we need to know what does the team look like; it depends on our programming ability
- what matters is how you build the application, how you code, how you structure your code, which affects the performance and how your app does
- you should pick the framework and library that the team is most familiar with.
- Angular is great for big big companies with lots of developers, as it's one of the most mature frameworks out of the lot. (to make sure they do things the same standard way)
- React might be great for startups or people that want flexibility; If you trust your dev team to make the right decisions, to combine different libraries and tools together
- Vue allows teams to build things fast; it's a community built project or community supported projects


# View Fundamentals

- instalation: [Vue-Devtools](https://v3.vuejs.org/guide/installation.html#vue-devtools)
- using CDN = content delivery network
- we need to add the following line in the *index.html* file: `<script src="https://unpkg.com/vue@next"></script>`
- next we need to call a function in our *app.js* file called *Vue.createApp()*
  - the vue object is defined by the script we added in; it has a function called *createApp()* where it will tell vue to initialize a new application
  - the application it returns has the capability of keeping track of data and manipulating the document
  - this function has one argument, which is an object of configuration settings
- we will pass in an empty object (we'll add some settings later): `Vue.createApp({})`   
- next we need to mount the application: `Vue.createApp({}).mount('#app')`
  - mount = to insert a Vue application into the document
  - the moment we see the expression interpolated into the document indicates that Vue has been monted
  - *#app* is the id that we used in the index.html file
- we can add the vue extension


# Working with Data

- vue exables us to use expression in the document
- expression = a single line of code that evaluates to a value; the value may e a number, string or a logical value (i.e 2+2 evaluates to 4)
- vue will treat the content inside the *div* tag as a template (this only applies to elements that are selected by vue)
- expressions can be used inside templates
- an expression can be added to the template by writing a pair of two curly brackets; inside those we can write an expression
- how Vue handles expressions:
  1. runs the expression
  2. replaces curly brackets with value from the expression (this process is called string Interpolation)      {{ firstName }} -> John
- we can have multiple vue instances (tipically you have only one):

```javascript
        // app.js
        Vue.createApp({
        data() {
                return {
                firstName: 'John',
                lastName: 'Doe'
                }
        }
        }).mount('#app')
        Vue.createApp({
        data() {
                return {
                firstName: 'G.',
                lastName: 'Raff'
                }
        }
        }).mount('#app2')
```

```html
        <!--index.html-->
        <body>
        <div id="app">
                {{ firstName }}
                {{ lastName }}
        </div>
        <div id="app2">
                {{ firstName }}
                {{ lastName }}
        </div>
        <script src="https://unpkg.com/vue@next"></script>
        <script src="app.js"></script>
        </body>
```

- the mount method gives us flexibility of presenting the application whenever we need to.
- most of the time you'll want to mount the application immediately, but you have an alternative if you ever need it:

```javascript
        //app.js
        let vm = Vue.createApp({
                data() {
                        return {
                                message: "Hello World"
                        }
                }
        })
        setTimeout(() => {
                vm.mount('#app')
        }, 3000)
```
- accessing the instance data:

```javascript
        //app.js
        const vm = Vue.createApp({
                data() {
                        return {
                        firstName: 'John',
                        lastName: 'Doe'
                        }
                }
        }).mount('#app')
        setTimeout(() => {
        vm.firstName = 'Bob'           // we can access directly firstName without mentioning vm.datafirstName
        }, 2000)                // after 2s the first name will change in Bob
```

- proxy = a figure that can be used to represent the value of something in a calculation
- this means that when vue is initialized, it will store your data in a property called $data: vm.$data.firstName
  - this line will return the first name from the data object
  - view simplifies the code you have to write by creating proxy getters and setters for every data property we create
  - they are merely functions that will take care of retrieving or udating your data properties
  - we can call the data with or without a proxy: vm.firstName or vm.$data.firstName
  - by using proxies, our vue data is exposed directly from the object


# Methods

- this is a valid expression, but it's not ideal to write complex expressions inside the template. You usualy try to separate the logic from the view
```html
        <div id="app">
                {{ `${firstName} ${lastName.toUpperCase}` }}
        </div>
```
- instead we can use methods = methods are functions that you can use inside your vue instance or template; 
- functions defined in the *methods* object are proxied by vue; they are directly accessible in your template
- if you would like to use the functions inside the vue instance, you can acces them via the *this* keyword
- since we are storing the instance in the variable, methods are also accessible through the *vm* variable

```javascript
//app.js
        const vm = Vue.createApp({
                data() {
                        return {
                        firstName: 'John',
                        lastName: 'Doe'
                        }
                },
                methods: {
                        fullName() {
                        return `${this.firstName} ${this.lastName.toUpperCase()}`       // 'this' reffers to the data object 
                                                                                        // { "firstName": "John","lastName": "Doe" }
                        }
                }
        }).mount('#app')
```

- it's not recommended to use arrow functions because of the proxy mechanism in vue


# Directives

- directives = are attributes that change the behavior of the element it's applied to
- vue comes with a few built-in directives
- i.e: 
```javascript
//index.js
        <div id="app" v-cloak>  // to the browser, v-cloak is an attribute, but to vue this is a directive>
                {{ fullName() }}
        </div>
```
- unlike attributes, directives change how an element behaves
- all directives start with a *v*, followed by the name of the directive
- directives can have expressions of values
- *v-cloak* - waits for our vue app to mount itself onto the document; the moment it does, it will remove itself to whatever it's applied to
  - the intention behind this directive is to help us hide elements 
- continue the example:
```css
//main.css
[v-cloak] {
        display: none   /* any elements that have this attribute will be hidden in the document; this means the user won't see the ugly expressions */
}
```


# Two-Way Data Binding

- two-way data binding = the ability to update data through the html document or JS file
  - any changes in the document will be reflected in the instance;
  - any changes in th JS vue instance will be reflected in the document
- i.e:
```html
<!--index.html-->
        <div id="app" v-cloak>
                <p>{{ fullName() }}</p>
                <hr />
                <label for="">First Name</label>
                <input type="text" v-model="firstName">
                <label for="">Last Name</label>
                <input type="text" v-model="lastName">
        </div>
```
- the value that gets evaluated from the expression is what will be used as the value for the input field
- the *v-model* directive requires a value, which is an expression
- reactivity = is when any changes to the data is immediately reflected on the page


# Binding Attributes

- by adding the v-bind directive to an attribute, you will process the value as an expression
- i.e:
```javascript
//app.js
        const vm = Vue.createApp({
            data() {
                return {
                    firstName: 'John',
                    lastName: 'Doe',
                    url: 'https://google.com'           // <---
                }
            },
            methods: {
                fullName() {
                    return `${this.firstName} ${this.lastName.toUpperCase()}`
                }
            }
        }).mount('#app')

//index.js
        <div id="app" v-cloak>
                <p>{{ fullName() }}</p>
                <p><a v-bind:href="url" target="_blank">Google</a></p>        
                <hr />
```
- because it's so commonly used, we can use the shorthand version by only keeping the *:* as below:
                `<p><a :href="url" target="_blank">Google</a></p>`

## Outputting raw HTML:
- cross site scripting(XSS): when malicious or harmful HTML is injected into the webpage causing unintendedbehavior in the browser
  - this usually happens when you output HTML from an external data source
- we use v-html directive to output raw HTML onto the document
- i.e:
```javascript
//app.js
const vm = Vue.createApp({
        data() {
                return {
                firstName: 'John',
                lastName: 'Doe',
                url: 'https://google.com',
                raw_url: '<a href="https://google.com" target="_blank">Google</a>'
                }
//index.js
        <div id="app" v-cloak>
                <p>{{ fullName() }}</p>
                <p><a :href="url" target="_blank">Google</a></p>
                <p v-html="raw_url"></p>              // <---
                <hr />
```

## Listening to events
- out of the box, vue supports native browser events such as clicks, key inputs, hovers etc.
  - we ca listen for those events to run a function whenever an event occurs
  - we can listen for events by using directives inside the app.js file
- i.e:
```javascript
//app.js
        const vm = Vue.createApp({
                data() {
                        return {
                        firstName: 'John',
                        lastName: 'Doe',
                        url: 'https://google.com',
                        raw_url: '<a href="https://google.com" target="_blank">Google</a>',
                        age: 20                         <----
                        }
                },
                methods: {
                        fullName() {
                        return `${this.firstName} ${this.lastName.toUpperCase()}`
                        },
                        increment() {
                        this.age++
                        }
                }
        }).mount('#app')
//index.js
<p>{{ age }}</p>
<button type="button" v-on:click="increment">Increment</button>
<button type="button" v-on:click="age--">Decrement</button>
```

- there is a shorthand: to replace 'v-on' with the '@' character as below:
`<button type="button" @click="increment">Increment</button>`
- the *v-model* directive is a combination of binding and using events in vue
- i.e that mimics how the v-model works (the difference is that we can do more during the process if we needsuch control):
```javascript
//app.js
        methods: {
                fullName() {
                return `${this.firstName} ${this.lastName.toUpperCase()}`
                },
                increment() {
                this.age++
                },
                updateLastName(event) {
                this.lastName = event.target.value
                }
        }
```
```html
<!-- index.html -->
<label for="">Last Name</label>
<input type="text" :value="lastName" @input="updateLastName">
```
## Passing on Data with Events
- i.e:
```javascript
//app.js
        methods: {
                fullName() {
                        return `${this.firstName} ${this.lastName.toUpperCase()}`
                },
                increment() {
                        this.age++
                },
                updateLastName(msg, event) {            <--- we provide our arguments here
                        event.preventDefault()          <--- called to prevent the default behavior
                        console.log(msg)
                        this.lastName = event.target.value
                }
        }
```
```html
<!-- index.html -->
<label for="">Last Name</label>
<input type="text" :value="lastName" @input="updateLastName('Last name event triggered!', $event)">
```

## Event Modifiers:
- calling `event.preventDefault()` is standard in most apps because you may not want the default browserbehavior to affect your app
- the event modifiers feature modify the way an event is handled
- documentation: [Events](https://v3.vuejs.org/guide/events.html)
- they can be used by adding a dot after the event name; this dot is followed by the modifier you'd like touse:
        `<input type="text" :value="lastName" @input.prevent="updateLastName('Last name event triggered!',$event)">`
- adding this is the equivalent of calling the prevent default method in our function

## Keyboard Events and Modifiers:
- documentation for key modifiers: [Key-Modifiers](https://v3.vuejs.org/guide/events.html#key-modifiers)
- i.e:
```javascript
//app.js
        methods: {
                updateMiddleName(event) {
                this.middleName = event.target.value
                }
        }
```
```html
<!-- index.html -->
        <label for="">Middle Name</label>
        <input type="text" @keyup.enter="updateMiddleName">     <!-- '.enter' is a key modifier -->
```
- if there isn't any name assigned, we can use the code assigned to a key by the browser: https://keycodeinfo/ (the event.code window)
- i.e:
```html
<label for="">Middle Name</label>
<input type="text" @keyup.enter="updateMiddleName">             <!-- when enter is pressed -->
<button type="button" v-on:click="increment">Increment</button>
<button type="button" @click.ctrl="age--">Decrement</button>            <!-- when Control is pressed whileclicking the decrement button -->
```
## v-model Modifiers
- there are 3
  - *.number*: convert a string to a number
        ```html
        <label for="">Age</label>
        <input type="number" v-model.number="age">
        ```
  - *.lazy*: will change when the data property is updated (normally, the data property is updated on every key  press)
  - *.trim*: remove excessive white space from a value      

## Computed Properties
- are properties that are calculated in some sort of manner
- when any of the data properties are updated, you will render the template again onto the page
- this means that any methods in the template are recalled during the process
- in order to call them only when necessary, we use computed properties.
- vue treats computed properties as data
- i.e:
```javascript
//app.js
        const vm = Vue.createApp({
        data() {
                return {
                firstName: 'John',
                middleName: '',
                lastName: 'Doe',
                url: 'https://google.com',
                raw_url: '<a href="https://google.com" target="_blank">Google</a>',
                age: 20
                }
        },
        methods: {
                increment() {
                this.age++
                },
                updateLastName(msg, event) {
                console.log(msg)
                this.lastName = event.target.value
                },
                updateMiddleName(event) {
                this.middleName = event.target.value
                }
        },
        computed: {
                fullName() {                               // we moved 'fullName' into 'computed' object
                console.log('Full name computed property was called!')
                return `${this.firstName} ${this.middleName} ${this.lastName.toUpperCase()}`
                }
        }
```
```html
<!-- index.html -->
        <div id="app" v-cloak>
                <p>{{ fullName }}</p>   <!-- we don't need paranteses -->
```
- view will cache the values of computed properties
- when a data property is updated: 
  - first it will scan the function of the computed property and check whatdata properties you're using inside the function
  - if any of those values change, vue will rerun the function and updatethe value
  - if a data property was updated that wasn't used inside the function,vue will not bother updating the value
  - therefore we save on performance and execution time
- vue knows when to call the function based on the data used inside the function, even if it isn't activelyused
  - i.e: 
  ```javascript
  //app.js
  computed: {
          fullName() {
          console.log('Full name computed property was called!')
          this.age                                                                       //<---
          return `${this.firstName} ${this.middleName} ${this.lastName.toUpperCase()}`
  ```
  - because we are using the age data property in the method, vue was able to pick up on that
  - since the age got updated, then the function gets called
- the data property is used to store single values; you can store objects and arrays as well; it's not the kind of object where you would store functions
- if you want to store functions, you would use the `methods` property
- if you have a function that calculates a value, you would use a *computed* property
- diffrences between methods and computed properties:
  - with methods you are allowed to calculate values; you can use them in expressions; you can use them       exclusively, but you would lose on the performance
  - methods provide a lot of flexibility ( make requests, update elements etc)
  - with cmputed properties they serve one purpose: to calculate a value; unlike methods, you arealways expected to return a value

## Watchers
- watch your data for changes; whenever a change occurs, vue can run a function to execute additional logic
- we can watch any of the properties on the vue instance (this includes your data and computed properties)
- the key name must correspond to any of the key names inside the instance 
- we use watchers to perform additional actions whenever a value changes; this is especially true when youwant to perform asynchronous tasks
- computed properties are similar to watchers in that they watch our data for changes
  - computed properties can never be asynchronous, unlike watchers
- i.e:
```javascript
//app.js
        data() {
        watch: {
                age(newVal, oldVal) {
                setTimeout(() => {
                        this.age = 20           // after 3s, the age will revert back to 20, because thewatcher function will run when we change the age
                }, 3000)
                }
        }
```

## Binding classes:
- documentation: [Class and Style](https://v3.vuejs.org/guide/class-and-style.html)
- it's common to apply styles conditionally based on the data in our app
- i.e:
```javascript
//app.js
        data() {
                return {
                isPurple: false
                }
        }
```
```html
<!-- index.html -->
        <div id="app">
            <label>
              <input type="checkbox" v-model="isPurple"/> Purple
            </label>
            <div class="circle" :class="{ purple: isPurple }">
              Hi!
            </div>
        </div>
```
```css
/* main.css */
        .purple{
                background-color: #767DEA;
        }
```
- by binding the class attribute, vue can help us manage the classes for an element
- we can use object syntax for dynamically binding classes to elements 
- in the object, the key name represents the class names; their value will be the condition to check if the class should be added to the element
- we can use computed properties so the template does not become difficult to read when we have more classes
- i.e:
```javascript
//app.js
        data() {
                return {
                isPurple: false,
                selectedColor: ''
                }
        },
        computed: {
                circle_classes() {
                return { purple: this.isPurple }
                }
        }
```
```html
<!-- index.html -->
        <div id="app">
            <label>
              <input type="checkbox" v-model="isPurple"/> Purple
            </label>
            <select v-model="selectedColor">
              <option value="">White</option>
              <option value="text-black">Black</option>
              <option value="text-orange">Orange</option>
            </select>
            <div class="circle" :class="[selectedColor, circle_classes]">
              Hi!
            </div>                
          </div>
```
```css
/* main.css */
        .text-black{
                color: #424242;
        }
        .text-orange{
                color: #FFC26F;
        }
```

## Bindings styles
- documentation: [Class and Style](https://v3.vuejs.org/guide/class-and-style.html)
-i.e:
```javascript
//app.js
        data() {               
                return {                        
                    isPurple: false,
                    selectedColor: '',
                    size: 150                
                }
```
```html
<!-- index.html -->
        <input type="number" v-model="size">
            <div class="circle" :class="[selectedColor, circle_classes]" 
              :style="{ width: size + 'px', height: size + 'px', lineHeight: size + 'px '}">
              Hi!
            </div>
```
- i.e:
```javascript
//app.js
        computed: {                
                circle_classes() {                        
                    return { purple: this.isPurple }
                },
                circle_styles() {                        
                    return [{ width: this.size + 'px', height: this.size + 'px', lineHeight: this.size + 'px'}, { transform: 'rotate(30deg)' }]       
                }
```
```html
<!-- index.html -->
        <input type="number" v-model="size">
            <div class="circle" :class="[selectedColor, circle_classes]" :style="circle_styles">
              Hi!
            </div>
```

## Conditional rendering
- when elements are added or removed from the document based on a condition
- if a condition is truthy, the element is added to the page, otherwise the element is removed
- we can toggle an element by using a directive called v-if (this is conditional rendering)
- if a specific condition is met, the element will be rendered on to the template
- the value of v-if must be the condition
- i.e:
```javascript
//app.js
        let vm = Vue.createApp({
        data() {
                return {
                mode: 1
                }
        }
        }).mount('#app');
```
```html
<!-- index.html -->
        <body>
          <div id="app">
            <p v-if="mode == 1">Showing v-if directive content</p>                
          </div>
```
- *v-else-if* directive can only be used immediately after an element that is using the *v-if* directive
- *v-else-if* can be chained multiple times
- the value for *v-else-if* directive must be a condition that evaluated to true or false
- this condition will be checked if the condition inside the *v-if* directive returns false
- *v-else* directive does not include a condition
- the 3 directives must be of the same level inside the document
- i.e:
```html
<!-- index.html -->
        <div id="app">
            <p v-if="mode == 1">Showing v-if directive content</p>
            <h3 v-else-if="mode == 2">v-else-if</h3>
            <p v-else>v-else</p>
            <select v-model="mode">
              <option value="1">v-if</option>
              <option value="2">v-else-if</option>
              <option value="3">v-else</option>
            </select>                
        </div>
```
- to display multiple elements without hang to use numerous conditions we use the *template* element, whichserves as an invisible wrapper
- *template* is not an official HTML element, but it is a valid vue element
- vue will render the contents of the template tag without rendering the tag itself
- as a result, we will still be able to keep our HTML structure without ruining our styling integrity
- i.e: 
```html
//index.html
        <div id="app">
            <p v-if="mode == 1">Showing v-if directive content</p>
            <template v-else-if="mode == 2">
              <p>Bonus content</p>
              <h3>v-else-if</h3>
            </template>
            <p v-else>v-else</p>
```
- *v-if* is cheap on load because it's lazy, but expensive on toggle

## v-show Directive
- is an alternative solution for conditionally rendering content
- this will not remove the element, only hide it (by adding the css `display: none` property)
- i.e:
```html
<!-- index.html -->
        <div id="app">
            <p v-if="mode == 1">Showing v-if directive content</p>
            <template v-else-if="mode == 2">
              <p>Bonus content</p>
              <h3>v-else-if</h3>
            </template>
            <p v-else>v-else</p>                                
            <i v-show="mode == 1">v-show</i>
```
- v-show does not work with the v-lse directive
- v-show does not work with the `<template></template>` tag
- using the v-show directive is expensive on load, but cheap when it comes to toggling an element's appearance

## List rendering
- vue can help us loop through an array of items to render a list of elements
- to loop through an array we have to use the v-for directive; this needs a special syntax in the form of'item of items'
- i.e:
```javascript
//app.js
        let vm = Vue.createApp({               
            data() {                   
                return {                        
                    birds: ['Pigeons', 'Eagles', 'Doves', 'Parrots'],
                    people: [                            
                        { name: 'John', age: 20 },
                        { name: 'Rick', age: 18 },
                        { name: 'Amy', age: 33 }
                    ]
                }
            }                
        }).mount('#app');
//index.js
        <body>
          <div id="app">
            <ul>
              <li v-for="bird in birds" :class="bird">  
                {{ bird }}
              </li>
            </ul>                
          </div>
```
- if we want to grab the index and value, we'll need to grab this part of the expression with paranthesses
- vue requires we provide an alias for the name and index
- as a result, the alias *bird* will be used to represent the value in the current iteration
- the alias *index* will be used to represent the current index of the item
- i.e:
```html
<!-- index.html -->
        <div id="app">
            <ul>
              <li v-for="(bird, index) in birds" :class="bird">
                {{ bird }} - {{ index }}
              </li>
            </ul>                
          </div>   
```     
- to loop through an array of objects we use v-for again
- when you're looping through properties in an object, the first name will represent the property's valueand the second name will represent the key name
- the index is no longer available to us, as in the previous example
- if we want to use the index, we will need to add one more name
- i.e:
```html
//index.html
        <ul>
              <li v-for="person in people">
                <div v-for="(value, key, index) in person">
                  {{ key }}: {{ value }} - Index: {{ index }}
                </div>
              </li>                
            </ul>
```
- when iterating over an object, the order is based on the enumeration order of `Object.keys()`, which isn't guaranteed to be consistent across JS engine implementations
- there is a way to keep track of items in arrays even if they move around: by binding the key attribute onthe list item
- the value for this must be a unique name for each iteration in the loop
- now we have a way to uniquely identify an item in the array, even if any of their positions change
- i.e:
```html
<!-- index.html -->
        <ul>
              <li v-for="(bird, index) in birds" :class="bird" :key="bird">
                {{ bird }} - {{ index }}
              </li>                
            </ul>
```
- without the key attribute, vue will move the data around, but not the elements themselves; this process is called 'patching'
- by adding the key attribute, we're forcing the elements to move
- `document.execCommand()`  - this method allows us to perform user actions on the browser (like cutting, pasting, copying content from the browser)


# Vue Lifecycle

- documentation: [Lifecycle Hooks](https://v3.vuejs.org/guide/instance.html#lifecycle-hooks)
- Vue goes through a process called lifecycle, which allows us to run code at certain points in the application's lifecycle
- it enables us to run code when a new instance is created
- we're not limited to creating the data inside our instance; we can run code during the creation process and even after the instance is destroyed

## Lifecycle:    
`Vue.createApp()`              
`.mount()`
  - the function where you pass in your settings and data for Vue to work with; during this processyou will  begin the lifecycle
  - Vue will create areas within itself where we can inject code and do whatever we want
Initialize data and methods
  - the very first thing Vue does is add reactivity to your data  
  - this process is where it begins to watch your data for any changes
  - before that happens, you have the opportunity to run some code    
    - `beforeCreate` hook      
      - at this point, the vue instance hasn't been fully created
      - we won't have access to data or any of its methods
Instance Created
  - once everything has been initialized, the vue instance is ready
  - we are provided another lifecycle hook
    - `created` hook               
      - unlike before, we can access the data and methods inside the vueinstance
      - vue is not mounted to any template, nor will anything be renderedonto the  page
Compile Template (*el* property)
  - after the vue instance is created, it'll start looking for a template
  - this part of the lifecucle starts the moment we call the mount() method on the application
  - vue will scan the template code and begin processing it; this process is what's called compiling
  - this is where vue will scan for directives, expressions, events and bindings inside the template
  - once the template is compiled, vue will replace the content inside the element we selected withthe mount()     method with the compiled template
  - before that happens, we have the opportunity to hook into the beforeMount lifecycle hook
    - `beforeMount` hook
Replace el property with compiled template
  - once mounting is completed, we can hook into the mounted lifecycle hook       
Mounted                 
  - at this point, vue has inserted itself into the document
  - we'll be able to see the rendered template on the document
  - all expressions, directives and bindings have been processed
`vm.unmount()`    
- we have the ability to destroy the view instance
- this means that any reactivity, events, directives or bindings will be disabled and gone
- you may want to do this in case you want the user to no longer interact with the application
- once the unmount method is invoked, vue will take care of the rest and finally destroy the instance
- there is no way to turn back
- during this process there are two hooks we can use:
  - `beforeUnmount`           
    - is called before the instance is destroyed; your application isstill fullyfunctional and present on the page
    - you can access any of the data and methods in your vue app
  - `unmounted`               
    - triggered once the vue instance is destroyed
    - you won't be able to access the instance anymore
    - any data or methods will be gone and inaccessible
Data Changes
  - after the mounting faze has completed, your application will watch the data for any changes
  - this usually happens during events such as mouse clicks or inputs
  - any time the data has been updated, we will then update the template
Apply changes to the template
  - we are provided two hooks during this process (mainly used for debugging)
    - `beforeUpdate`   - gets triggered after the data has been updated but has not beenapplied to the template
    - `updated`        - runs once the template is patched with the updated data
- i.e:
```javascript
//app.js
let vm = Vue.createApp({
  data() {
    return {
      message: "Hello world!"
    }
  },
  beforeCreate() {
    console.log('beforeCreate() function called!', this.message)
  },
  created() {
    console.log('created() function called!', this.message)
  },
  beforeMount() {
    console.log('beforeMount() function called!', this.$el)
  },
  mounted() {
    console.log('mounted() function called!', this.$el)
  },
  beforeUpdate() {
    console.log('beforeUpdate() function called!')
  },
  updated() {
    console.log('updated() function called!')
  },
  beforeUnmount() {
    console.log('beforeUnmount() function called!')
  },
  unmounted() {
    console.log('unmounted() function called!')
  }
})

vm.mount('#app')
```


# Virtual DOM

- the virtual DOM is a JS object.
- it is a lightweight copy of the actual DOM
- it's faster to eprform comparisons and updates on the virtual DOM than it is to perform them on the actual DOM


# Reactivity with Proxies

- reactivity is when a program is able to react to changes
- to do this, Vue is using something called proxies
- the Proxy() object allows us to observe an object
- a proxy can be created by creating a new instance out of this object; it has 2 arguments:
  - the first arg is the object that should be observed 
  - the second arg is another object 
- the new instance that is returned is a copy of the object that we passed into the first argument
- we can treat the observed data object as if it were the data object
- the main difference is that we can add additional functions to it that will be called based on how the object is being interacted with
- we can define functions in the object we passed into the second argument
- i.e:
```javascript
        //JS
        const data = {
                name: 'Luis'
        }
        const observedData = new Proxy(data, {
                set(target, key, value) {                        
                        target[key] = value
                }
        })
        console.log(observedData.name)          //"Luis"
```

- the set function will be called whenever any of the objects properties are about to be updated
- this function is called before the update occurs
- there are 3 arg we can accept in the function: 
  - *target*: references the object we're accessing (equivalent to *this* keyword)
  - *key*: the name of the property that's being accessed
  - *value*: the value that the property will be set to 
- by defining this function the property will never be updated, because the set function will be responsible for updating the property
- if it didn't exist, the default behavior will occur
- in our 'set' function we can have the default behavior back by setting target to the value
- the set function will always be called for any of the properties on the object
- when they're updated, we can use this opportunity to perform additional actions
- i.e:
```html
<!-- HTML -->
        <div id="name"></div>
```
```javascript
//JS
        const data = {
                name: 'Luis'
        }
        const observedData = new Proxy(data, {
                set(target, key, value) {          
                        document.querySelector("#name").innerText = value             
                        target[key] = value
                }
        })
        observedData.name = 'John'
        console.log(observedData.name) 
```

- by using proxies, we can create our own reactive JS framework
- we don't need to do this, Vue is doing it for us.
- behind the scenes, vue is using the proxy object to help keep track of changes to our data
- documentation: [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)


# The Vue Compiler

- there are multiple versions of vue available for download, but all of them can be broken down into 2 categories
  - with the compiler (full build)
  - advantages without the compiler (runtime onlty build):
    - 30% lighter than the full version;
    - slightly faster, since Vue no longer has to compile the template
  - disdvantages without the compiler:         
    - difficult to read and manage code with plain JS
    - tooling required if you want to make the process easier
- the compiler is responsible for taking your tempalte as a string; it will convert the template into an object for the virtual DOM
- whenever you use the template property or the mount method, the compiler will be used
- documentation: [Explanation of different builds](https://v3.vuejs.org/guide/installation.html#explanation-of-different-builds)
- compiler = code that is responsible for compiling template strings into JS render functions
- render function = a function that will take care of rendering the template in the document
  - is responsible for returning an object that represents the template you passed in
- we have the option of completely removing the compiler by using the runtime build, but we need to build the object ourselves and provide it to vue
- i.e (the first app is using the compiler, the second one is manually creating the object):
```javascript
//app.js
        let vm = Vue.createApp({
          data() {
            return {
              message: "Hello world!"
            }
          },
          template: `{{message}}`
        })

        vm.mount('#app')

        let vm2 = Vue.createApp({
          data() {
            return {
              message: "Hello world!"
            }
          },
          render() {
            return Vue.h(
              'h1',
              this.message
            )
          }
        }).mount('#app2')
```
- `Vue.h()` function      
  - helps us to create the object in the correct format;
  - will take care of filling in the blanks for us
  - h is short for hyperscripts (you use JS to create HTML)
  - it has 2 parameters: 
    - the name of the element
    - the content inside the elements
- different versions of vue: [Vue Versions](https://cdnjs.com/libraries/vue)


# Components

- are the pieces that make up your application (ex: header, footer, posts, lists, etc)
- storing the tempalte for an application is a single file can be hard to manage; therefore it's ideal to split the templates into separate files
- the most commonly used feature in vue
- makes it easy to manage the sections of your page
- components must be created before we mount the application
- we can create a component by calling the vm.component() function
  - it has 2 parameters:  
    - the name of the component ( kebob case convention is used for naming - replace space with a dash)
    - the configuration object for the component ( we can add the data, computed and methods property)
- the mount method can't be used with a component
- i.e:
```javascript
        //app.js
                let vm = Vue.createApp({
                  // template: ``
                })

                vm.component('hello',{
                  template: `<h1>{{ message }}</h1>`,
                  data() {
                    return {
                      message: 'Hello World!'
                    }
                  }
                })

                vm.mount('#app')
```
```html
        <!-- index.html -->
                <body>
                  <div id="app">
                    <hello></hello>
                    <hello></hello>
                    <hello></hello>
                  </div>
```

# Vue Developer Environment

- primary libraries used in most advanced projects: Webpack, Babel, PostCSS, SASS, ESLint

## Webpack
- documentation: [Webpack](https://webpack.js.org/)
- Webpack is an asset bundler; it compresses everything into as few files as possible
- it can deal with various file types, deploy your application and even provide a development server
- it's also pluggable, meaning we can download third party libraries to extend Webpack
- installation: `$ npm install webpack webpack-cli --save-dev`
- there are 2 setting we always need to configure when working with Webpack:
  - tell Webpack where it can find our files
  - tell Webpack where it can output the bundle
- we need to create a file called *webpack.config.js* that will contain the settings for Webpack
- i.e:
```javascript
        module.exports = {
            entry: './index.js',
            output: {
                filename: 'bundle.js',
                path: __dirname + '/dist'
            }
        }
```
- if we don't set an entry file, Webpack will asume we have a directory called Source with a file called index.js
- the entry point responsability is to list the dependencies required for our project 
- __dirname is a constant defined by node, globally available, that contains the path to the current file it's being used in
- we are appending a directory called */dist* (short for distribution)
- to run Webpack, we can input the following commands: $ ./node_modules/.bin/webpack
- we can set 'mode' option to 'development' or 'production' to enable defaults for each environment.
- it is recommended to set them in *package.json* file:
```json
        //package.json
        {
          "name": "Webpack",
          "version": "1.0.0",
          "description": "",
          "main": "index.js",
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "start": "webpack --mode=development",                      // <---
            "build": "webpack --mode=production"                        // <---
          },
          "keywords": [],
          "author": "",
          "license": "ISC",
          "devDependencies": {
            "webpack": "^5.59.0",
            "webpack-cli": "^4.9.1"
          }
        }
```
- then we can run: `$ npm run start` or `$ npm run build`
- loaders: Webpack only understands JS; If Webpack comes across a non JS file, then it needs to be told how to process that file
- loaders instruct Webpack how to process and handle non JS files.
- plugins: extend the functionality of Webpack ( ex: delete files, start a server, deploy your app etc)
- we can configure Webpack to watch for changes:
  - inside the config file add a property called watch (by default it's set to false):
```javascript
        //webpack.config.js
        watch: true
```

## Babel

- is a JS compiler that will enable us to use JS syntax that may not be available in some browsers
- it will make sure our code is backward compatible
- if an user is on an older browser, it may not be able to use the latest features of JS; Babel resolve this issue by compiling our JS code
- Babel is a modular library; we have to download and install separate modules to get it to work
- usually, you will end up installing a minimum of three modules: 
  - Babel Core module:    
    - contains the core functionality; it does not determine what features we like to enable in the JS language
    - it will take care of reading your code and compiling it into a code that the browser can understand
  - Babel Loader module:  
    - if we want to use Webpack and Babel together, this module is necessary
  - Babel Presets modules:
    - to provide the features we need
    - list of presets available: [Presets](https://babeljs.io/docs/en/presets)
    - `@babel/preset-env` is considered the most stable and usable module out of all
- i.e:
```javascript
        //webpack.config.js
        module.exports = {
            entry: './index.js',
            output: {
                filename: 'bundle.js',
                path: __dirname + '/dist'
            },
            module: {
                rules: [
                    {
                        test: /\.js%/,                  // <--- checking if the file ends in .js extension
                        exclude: /(node_modules)/,      // <--- prevent the processing of files in the node_modules directory
                        use: 'babel-loader'             // <--- this property will tell Webpack what loader to use
                    }
                ]
            }
        }
```
- we need to create also the file .babelrc to configure Babel
```
        //.babelrc
        {
            "presets": [
                "@babel/preset-env"
            ]
        }
```
- then we run again `$ npm run start` 

## SASS

- a stylesheet language just like CSS
- it's not natively supported by browsers
- we can use Webpack to compile SaSS into CSS
- documentation: [SASS](https://sass-lang.com/)
- installation: `$ npm i node-sass sass-loader css-loader --save-dev`
- we need to modify webpack.config.js to use the sass module:
```javascript
        //webpack.config.js
        [..]
            module: {
                rules: [
                    {
                        test: /\.js%/,   //checking if the file ends in .js extension
                        exclude: /(node_modules)/,   //prevent the processing of files in the node_modules directory
                        use: 'babel-loader'
                    },
                    {
                        test:/\.scss$/,
                        use: [
                            'css-loader','sass-loader'
                        ]
                    }
                ]
            }
        }
```
- we need to create main.scss file where we can write our code:
```css
        //main.css
        h1 {
            color: red;
        }
```
- import the file in index.js:
```javascript
        //index.js
        import pizza from './pizza'
        import './main.scss'
```
- at this point, the elements remain unaffected despite defining styles in out project.
- this is because the code itself is being loaded through JS, but it's not added in as a style sheet
- Webpack will not take care of adding style tags to the document, nor will it separate it from the bundle file
- we need to tell Webpack where to place the CSS code; there are 2 ways to do that:
  - we can have Webpack dynamically add it to the page or bundle it as a separate file
- we need to add another loader; to do that we run: `$ npm i style-loader --save-dev`
- the style-loader module is able to extract CSS from our bundle and load the CSS in a pair of style tags
- the next step is to configure Webpack to use the loader 
- inside the webpack.config.js file we need to add another item to the list of loaders:
```javascript
        //webpack.config.js
        {
                test:/\.scss$/,
                use: [
                    'style-loader',             //<-- this module should be placed at the top, since we want it to run last
                    'css-loader',
                    'sass-loader'
                ]
        }
```
- now the change is happening, because the style-loader module is loading the CSS dinamically
- this method is not ideal for production, as you may want to save the css in a separate file; this is possible with the help of a plugin
- plugins are a way to extand hoe Webpack works

### Mini CSS Extract Plugin
- [Mini CSS Extract plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- it will extract the CSS from the bundle
- the CSS will be saved in a separate file
- we need to run $ npm i mini-css-extract-plugin --save-dev
- this is a Webpack plugin
- first we need to add it to our project: 
```javascript
//webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');                // <---
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js%/,   //checking if the file ends in .js extension
                exclude: /(node_modules)/,   //prevent the processing of files in the node_modules directory
                use: 'babel-loader'
            },
            {
                test:/\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,                // <---
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [                                                  // <---
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ]
}
```
- we also need to link the new created css file to index.html:
```html
<!-- index.html -->
<link rel="stylesheet" href="dist/main.css">
```

## SAS Basics

- SASS is built on top of CSS
- creating a variable:  
  - i.e: `$red: #CC3244;`
  - variable definitions must start with `$` symbol
- SASS comes with a set of functions for calculating color values:
```scss
        //main.scss
        h1:hover {
            color: darken($red, 25%);
        }
```
  - list of functions you can use to change colors: [Color changing](https://sass-lang.com/documentation/modules/color)
- SASS has the ability to nest code:
```scss
        //main.scss
        h1 {
            color: $red;

            span {              //h1 span
                color: blue;
            }

            &:hover {           // & = the parent selecter
                color: darken($red, 25%);
            }
        }
```
- using the *import* statement is not the most efficient way to include other CSS files;
- it's must faster to use the link tag in HTML
- import statements in SASS work a bit differently:
  - SASS bundles our CSS together; if you have inport statements in your SASS code, your files will be bundled into one
  - rather than having one SASS file to hold your stylings, you can safely split your code into separate files
  - this will optimize the way you write code
  - you still benefit from the performance SASS has to provide
- import files in SASS:
  - we're going to create a file called variables.scss then we move the variables over
  - then we need to import that file in *main.scss*: `@import "variables";`

## PostCSS

- is commonly isntalled with Webpack and SASS
- PostCSS = a Post processor for CSS
- it's a library written in JS that can modify your CSS code after you've written it
- it will convert your CSS into an object; the object can be manipulated and transformed with JS
- we can use JS to make changes to the CSS code we write - this is why it's called postCSS
- documentation: [PostCSS](https://github.com/postcss/postcss)
- to install it: `$ npm i post-loader --save-dev`
- add the module in *webpack.config.js*:
```javascript
        {
                        test:/\.scss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'postcss-loader',
                            'sass-loader'
                        ]
                    }
```
- create a config file called *postcss.config.js*
- if we want make changes to the CSS code, we need to use plugins
- plugins are a way to extend postCSS that can interact with our CSS
- plugins available: [PostCSS Plugins](https://www.postcss.parts/)
- autoprefixer plugin: `$ npm i autoprefixer --save-dev`
  - it will scan our CSS properties for missing vendors
  - it will add vendor prefixes to properties that require a vendor prefix for older browsers
```javascript
        //postcss.config.js
        module.exports = {
            plugins: {
                autoprefixer: {}
            }
        }
```
- we need to tell postCSS which browsers will be supporting; this way it doesn't add excessive CSS code to the final output
- we need to list the browsers in the package.json file
```json
        //package.json
        "browserslist": [
          "> 1%",
          "last 2 versions"
        ]
```

## ESLint

- linting = the process of reviewing your code for consistencies; it's essentially a code quality reviewer
- it will make sure you're formatting your code in a specific way
- a proper linting tool will throw an error whenever you stray from the standard set by your team
- ESLint documentation: [ESLint](https://eslint.org/)
- installing ESLint: `$ sudo npm i -g eslint`
- configuring ESLint: [Configuring ESLint](https://eslint.org/docs/user-guide/configuring/)
- we first create a separate config file called *.eslintrc.json*
- to verify it is working we can run $ eslint *app.js*
- ESLint comes with a preset of settings we can use; presets are a way to configure ESLint without having to type every setting
```json
        //.eslintrc.json
        {
            "extends": "eslint:recommended"
        }
```
- in the console we can see the name of the rule that we break: [ESLint Rules](https://eslint.org/docs/rules/)
```json
        // .eslintrc.json
        {
            "extends": "eslint:recommended",
            "env": {
                "browser": true
            }
        }
```


# Vue CLI

- is a tool manager
- its purpose is to help you organize your files, preconfigure tools and let you start building your application right away
- the code base of an application can be broken into 2 parts:
  - code from external libraries: 
    - can be considered code from libraries like Vue.js or Axios.js
    - it's code we didn't write but are using in our app
  - application code     
    - is the code we writen to get a functioning app
    - splitting your code base into different files is ideal for development
- Vue CLI is a tool manager that will help you with configuring other tools ( like Webpack, Babel, SASS)
- it can help with the build process for either development or production
- documentation: [Vue CLI](https://cli.vuejs.org/)
- instalation: `$ sudo npm install -g @vue/cli`
- the model we installed will create a new set of commands that will allow us to set up a new vue project
- we can run this to see what commands we can use with vue: $ vue
- to create a project: vue create components
  - we select Default(Vue 3)      <--- is the preset with the least amount of tools
- a server will be necessary because browsers impose limitations on files open directly in the browser
- to remove any limitations, we'll need to deliver the files via a server
- run the following command: $ npm run serve
  - this is a ccommand you can find inside the package file
  - this will start a server; it will bundle our project and serve the bundle for us
  - we can preview our project with this command
- the vue CLI will run a server on our computer that can handle the request if we type localhost
- the server will respond with the html, css and js files we have in our project
- we don't have to write a single line of code to get this functionality working
- the server will watch for file changes in our project; if a file is updated, the server will refresh the browser to show the latest changes
- vue CLI packages:
  - `@vue/cli-service`  - build and serve commands
  - `@vue/cli`  - additional commands for managing your project ( adding plugins, changing config, creating new  project)
  - `@vue/cli-service-global` - allows you to use the build and serve commands globally
- vue files are considered components; they all end with *.vue* extension


# Creating Components

- the bare minimum requirements for a single component file to be valid is the template block
- the template block must contain at least one root element
- we're allowed to have multiple root elements in an app inside the template
- inside the scripts block we can export an object;
- the object we're exporting will be used for the components settings
- this is where you should add you data, methods, computed properties and watchers
- i.e:
```vue
        <!-- App.vue -->
        <template>
        <p>{{ msg }}</p>
        </template>

        <script>
        export default {
          name: "App",
          data() {
            return {
              msg: "Hello World!",
            };
          },
        };
        </script>
```


# Child Components

- to register a component globally:
```javascript
        //main.js
        import { createApp } from 'vue'
        import App from './App.vue'
        import Greeting from './components/Greeting.vue'        //<--

        const vm = createApp(App)

        vm.component('Greeting', Greeting)              //<-- components must be registered after a vue instance 

        vm.mount('#app')
```

- it's best practice to register a component locally
- local components can only be used in the component it was registered in
- the app component is the only component we have that will be using the greeting component
- to register a component locally we can add a property to the configuration called components
- i.e:
```vue
        <!-- src/components/Greeting.vue -->
                <template>
                <p>{{ msg }}</p>
                </template>
                <script>
                export default {
                name: "Greeting",
                data() {
                return {
                msg: "Hello World!",
                };
                },
                };
                </script>
        <!-- src/App.vue -->
                <template>
                <greeting> </greeting>
                </template>
                <script>
                import Greeting from './components/Greeting.vue';
                export default {
                name: "App",
                components: {
                Greeting,
                }
                };
                </script>
```


# Component Styles

- the style blocks is where we can define styles for a component
- shadow DOM = is a way to isolate components from the regular DOM with its own stylings, events and structure
- the shadow DOM makes it possible to have multiple DOMS inside your document
- vue is able to do something similar with its virtual DOM
- the virtual DOM is a JS object that is a copy of the real DOM; The shadow DOM is an isolated DOM from the real DOM
- you need to add the attribute scoped; 
- documentation: [Scoped CSS](https://vue-loader.vuejs.org/guide/scoped-css.html#scoped-css)
- by adding it, you will compile the tempalte while making sure these styles are only applicable to the component
- i.e:
```vue
        <!-- Greeting.vue -->
        <style scoped>
        p {
            color: red;
        }
        </style>
```
- the shadow DOM is not completely supported in all browsers
- vue will simulate the behavior of a shadow DOM by adding additional details to your component
- vue will generate a style tag with the css you've written for the component


# Using SASS in Components

- if we want to use SASS we need to isntall the module
- run `$ npm i node-sass sass-loader --save-dev` (in case of errors you can try `$ npm install -D sass-loader@^10 node-sass`)
- i.e:
```vue
        <!-- Greeting.vue -->
        <style scoped lang="scss">      //<-- our project is now using sass
        $color: red;
        p {
            color: $color;
        }
        </style>
```
- adding the language attribute will instruct the compiler to use the preprocessor for the language you're specifying
- documentation: [Referencing Assets](https://cli.vuejs.org/guide/css.html#referencing-assets)


# Communication Between Components

- parent components are able to send data down to their children components
- data that is sent to components are called props
- props is short for properties; it will be set to an array that contains a list of properties that the component will accept
- the name inside the props array needs to match the attribute name
- i.e
```vue
        <!-- User.vue -->
                <template>
                  <p>The user is {{ age }} years old</p>
                </template>

                <script>
                export default {
                    name: "User",
                    props: ["age"]
                }
                </script>
        <!-- App.vue -->
                <template>
                <h3>Hey!</h3>
                <greeting></greeting>
                <user :age="age"></user>   <!-- we have to add ':' before the name to bind the attribute-->
                </template>
                <script>
                import Greeting from './components/Greeting.vue';
                import User from './components/User.vue';
                export default {
                  name: "App",
                  components: {
                    Greeting,
                    User,
                  },
                  data() {
                    return {
                      age: 20
                    }
                  }
                };
                </script>
```
- any changes are trickled down to children components
- limitations of props:
  - we are not allowed to mutate props, because the parent component will not be notified of the change
    - the changes will not be reflected in other components too
  - not being able to hold on to those changes
    - if the parent component updates the age, it will overwrite the changes in the child component
    - the parent component has priority over changes to its data
- in order to update props from the child component (as props are not allowed to be updated in child components) we'll use emitting events
- emitting events = to produce or trigger an event
- vue has a special function for emitting an event: this.$emit()
  - will emit an event that other components can listen for
  - the functions that starts with $ are vue functions
- only parent components can listen for events from children components
- i.e:
```vue
        <!-- User.vue -->
                <template>
                    <button type="button" @click="onClickAge">Update age</button>
                    <p>The user is {{ age }} years old</p>
                </template>

                <script>
                export default {
                    name: "User",
                    props: ["age"],
                    methods: {
                        onClickAge() {
                            this.$emit("age-change")
                        }
                    }
                }
                </script>
        <!-- App.vue -->
                <template>
                <h3>Hey!</h3>

                <greeting :age="age"></greeting>
                <user :age="age" @age-change="age++"></user> 
                </template>
- i.e to increment age by 3:
```vue
        <!-- User.vue -->
                <template>
                    <button type="button" @click="onClickAge">Update age</button>
                    <p>The user is {{ age }} years old</p>
                </template>

                <script>
                export default {
                    name: "User",
                    props: ["age"],
                    methods: {
                        onClickAge() {
                            this.$emit("age-change", 3)         <!-- <--- -->
                        }
                    }
                }
                </script>
        <!-- App.vue -->
                <template>
                <h3>Hey!</h3>

                <greeting :age="age"></greeting>
                <user :age="age" @age-change="updateAge"></user>        <!-- <--- -->
                </template>

                <script>
                import Greeting from './components/Greeting.vue';
                import User from './components/User.vue';

                export default {
                  name: "App",
                  components: {
                    Greeting,
                    User,
                  },
                  data() {
                    return {
                      age: 20
                    }
                  },
                  methods: {
                    updateAge(num) {
                      this.age += num           <!-- <--- -->
                    }
                  }
                };
                </script>

- we should add the emits option to the user component; vue wants to know what events the parent component can expect from the child component
- i.e:
```vue
        <!-- User.vue -->
        <script>
        export default {
            name: "User",
            props: ["age"],
            emits: ["age-change"],             <!-- <--- -->
```

- this process is necessary only when we need to make changes to any of the props
- we can continue to use props inside computed properties or methods
- we can use props as read-only values
- i.e:
```vue
        <!-- User.vue -->
        <template>
            <button type="button" @click="onClickAge">Update age</button>
            <p>The user is {{ age }} years old</p>
            <p>{{ ageDoubled }}</p>                     <!-- <--- -->
        </template>

        <script>
        export default {
            name: "User",
            props: ["age"],
            emits: ["age-change"],
            computed: {
                ageDoubled() {
                    return this.age * 2                 <!-- <--- -->
                }
            },
            methods: {
                onClickAge() {
                    this.$emit("age-change", 3)
                }
            }
        }
        </script>
```
- if you're using the value but not changing it, then it's not necessary to use events


# Validating Props

- by adding validation, you can catch if a component is passing in the wrong type of data, allowing you to fix it 
- rather than passing in an array, we can pass in an object of props to accept
- each property in the props object will represent a prop
- i.e:
```vue
        <!-- User.vue -->
        <script>
        export default {
            name: "User",
            props: {
                age: {
                    type: Number,        <!-- we can put multiple types ( ex. type: [Number, String]) -->
                    //required: true,
                    default: 20,
                }
            },
```
- types available: [Types](https://v3.vuejs.org/guide/component-props.html#type-checks)
- the default key must be set to a function if the type key is set to be an object or array
- the function must then return the object or array
- you can have custom validation, by using the validator property
- i.e:
```vue
        <!-- User.vue -->
        <script>
        export default {
            name: "User",
            props: {
                age: {
                    type: Number,    
                    //required: true,
                    //default: 20,
                    validator(value) {

                    }
                }
            }
```
- the function expects to return true or false; if true, the validation passes
- the validator functions run before the instance of the component its created
- therefore, you won't have access to the data computed or methods properties inside the function


# Callback Functions

- callback functions can be used to update data
- you can send down functions, objects and arrays
- i.e:
```vue
        <!-- App.vue -->
                <template>
                <greeting :age="age"></greeting>
                <user :age="age" @age-change="updateAge" :ageChangeFn="updateAgeCB"></user>             <!-- <--- -->
                </template>

                <script>
                import Greeting from './components/Greeting.vue';
                import User from './components/User.vue';

                export default {
                  name: "App",
                  components: {
                    Greeting,
                    User,
                  },
                  data() {
                    return {
                      age: 20
                    }
                  },
                  methods: {
                    updateAge(num) {
                      this.age += num
                    },
                    updateAgeCB(num) {          <!-- <--- -->
                      this.age += num
                    },
                  }
                };
                </script>
        <!-- User.vue -->
                template>
                    <button type="button" @click="onClickAge">Update age Event</button>
                    <button type="button" @click="ageChangeFn(3)">Update age CB</button>        <!-- <--- -->
                    <p>The user is {{ age }} years old</p>
                    <p>{{ ageDoubled }}</p>
                </template>

                <script>
                export default {
                    name: "User",
                    props: {
                        age: {
                            type: Number,
                            //default: 20,
                            validator(value) {
                                return value < 130                
                            }
                        },
                        ageChangeFn: Function                  <!-- <--- -->
                    },
                    emits: ["age-change"],
                    computed: {
                        ageDoubled() {
                            return this.age * 2
                        }
                    },
                    methods: {
                        onClickAge() {
                            this.$emit("age-change", 10)
                        }
                    }
                }
                </script>
```


# Inserting content with slots

- slots are a great way to pass down content from a parent component to a child component
- they are an alternative to using props
- first you need to identify which parts of your component are reusable or unique
- then we can use the <slot> tag, which is a component created by vue
- it will get replaced by the content that gets passed from the parent component
- i.e:
```vue
        <!-- Form.vue -->
                <template>
                  <form>
                      <slot>No form to render</slot>    <--- in case nothing is passed, this is the default text that will appear (it's optional)
                </form>
                </template>
        //App.vue
                <template>
                  <app-form >
                    <div class ="help">
                    <p>This is some help text</p>
                  </div>
                  <div class ="fields">
                    <input type="text" placeholder="email">
                    <input type="text" placeholder="username">
                    <input type="password" placeholder="password">
                  </div>
                  <div class ="buttons">
                    <button type="submit">Submit</button>
                  </div>
                  </app-form>
                  <app-form></app-form>
                </template>
                <script>
                import AppForm from "./components/Form.vue"
                export default {
                  name: "App",
                  components: {
                    AppForm,
                  }
                };
                </script>

- named slots: we can assign slots unique names; by doing this, we're given more control over where the slot content is distributed and placed
- the v-slot directive can be used to tell the child component where this slot content should be placed
- the v-slot directive may only be applied to template tags
- i.e:
```vue
        //Form.vue
                <template>
                  <form>
                      <div class="help">
                        <slot name="help"></slot>
                      </div>
                      <div class="fields">
                        <slot name="fields"></slot>
                      </div>
                      <div class="buttons">
                        <slot name="buttons"></slot>
                      </div>
                </form>
                </template>
        //App.vue
                <template>
                  <div>
                    <app-form >
                        <p>This is some help text</p>
                      <template v-slot:help>
                      </template>
                      <template v-slot:fields>
                        <input type="text" placeholder="email">
                        <input type="text" placeholder="username">
                        <input type="password" placeholder="password">
                      </template>
                      <template v-slot:buttons>
                        <button type="submit">Submit</button>
                      </template>
                    </app-form>
                    <app-form>
                      <template v-slot:help>
                        <p>Contact help text</p>
                      </template>
                      <template v-slot:fields>
                        <input type="text" placeholder="email">
                        <input type="text" placeholder="message">
                      </template>
                      <template v-slot:buttons>
                        <button type="submit">Submit</button>
                      </template>
                    </app-form>
                  </div>
                </template>
```
- we can use default slots and named slots together;
- by having a slot with no name, any elements that aren't assigned to a specific slot will be put there by default
- i.e:
```
        //Form.vue
        <template>
          <form>
              <div class="help">
                <slot name="help"></slot>
              </div>
              <div class="fields">
                <slot name="fields"></slot>
              </div>
              <div class="buttons">
                <slot name="buttons"></slot>
              </div>
              <slot></slot>                     <--- any elements that aren't assigned to a specific slot will be put here
        </form>
        </template>
```

- one advantage of slots is the ability to use data from the parent component
- i.e:
```
        //App.vue
        <template>
          <div>
            <app-form >
              <template v-slot:help>
                <p>{{ help }}</p>               <---
              </template>
              <template v-slot:fields>
                <input type="text" placeholder="email">
                <input type="text" placeholder="username">
                <input type="password" placeholder="password">
              </template>
              <template v-slot:buttons>
                <button type="submit">Submit</button>
              </template>
              <p>Dummy text</p>
            </app-form>
          </div>
        </template>
        <script>
        import AppForm from "./components/Form.vue"
        export default {
          name: "App",
          components: {
            AppForm,
          },
          data() {
            return {
              help: "This is some help text."           <---
            }
          }
        };
        </script>
```
- documentation: [Component-Slots](https://v3.vuejs.org/guide/component-slots.html)


# Dynamic Components

- a dynamic component is a component that can be swamped with other components; this allows you to toggle between components
- tthe component component allows you to dynamically load in a component dynamically
- i.e:
```vue
        //App.vue
                <template>
                  <select v-model="componentName">
                    <option value="Home">Home</option>
                    <option value="About">About</option>
                  </select>

                  <component :is="componentName"></component>
                </template>

                <script>
                import Home from "./components/Home.vue";
                import About from "./components/About.vue";

                export default {
                  name:"App",
                  components: {
                    Home,
                    About,
                  },
                  data() {
                    return {
                      componentName: "Home",
                    };
                  },
                };
                </script>
        //About.vue
                <template>
                  <h1>About Page</h1>
                </template>
        //Home.vue
                <template>
                  <h1>Home Page</h1>
                </template>
```
- when a component is toggled out, it gets unmounted
- this means that any data inside of it will not be available anymore
- if the component gets reintroduced on the page, the data will be reset to its default state
- vue provides the option of allowing persistent data by using the `<keep-alive>` component
- i.e:
```vue
//App.vue
  <keep-alive>
    <component :is="componentName"></component>
  </keep-alive>
```
- this will keep what's inside alive; even if it shouldn't appear in the DOM, thil will make sure the component lives in memory
- if the component needs to be added onto the page again, vue will use the one in memory rather than creating a new component
- there are two additional lifecycle hooks that weren't available before: `activated()` and `deactivated()`


# Animating with CSS Transitions

- vue devides the animation into frames, which is how mmost animations are done
- the first frame of the animation will have a class added to it called `*-enter-from`; 
  - this class is removed after the first frame
  - its purpose is to allow you to assign the elements some initial properties
- you also need to add a class called `*-enter-to`
  - this class is added at the final frame of the animation
  - it isn't commonly used, but it's useful if you want to add some finishing touches to the element after the animation is finished
- the last class that's added is the `*-enter-active class`
  - this class is added to the element from the beginning to the ending of the animation (including the first and final frames)

- the `<transition></transition>` component will add the classes mentioned above to the elements inside it
- by default, vue will start the class name with v (`v-enter-from`, `v-enter-active`, `v-enter-to`)
- to customize the name, you'll have to set the name property on the transition component: `<transition name="fade">`
- when leaving the document, there is another set of 3 classes: 
  - `*-leave-from` is added during the first frame of the animation
  - `*-leave-to` is added during the last frame of the animation
  - `*-leave-active` is added during the entire animation including the first and last frames
- once the animation is finished playing, the element is removed from the document
- i.e:
```vue
        //App.vue
        <template>
          <button type="button" @click="flag= !flag">Toggle</button>
          <transition name="fade"> 
            <h2 v-if="flag">Hello World!</h2>
          </transition>
        </template>
        <script>
        export default {
          name: 'App',
          data() {
            return {
              flag: false,
            };
          },
        };
        </script>
        <style>
        .fade-enter-from {
          opacity: 0;
        }
        .fade-enter-active {
          transition: all 0.25s linear;
        }
        .fade-leave-to {
          transition: all 0.25s linear;
          opacity: 0;
        }
        </style>
```


# Fine-tuning Transitions

- you can set a udration for a transition: `<transition name="fade" duration="1000">`
  - the value for the duration must be in ms
  - vue will prioritize the duration property over the duration in the CSS that is defined on the component
- we are not limited of using the v-if directive; animations can be applied to elements using the v-show directive
- documentation: [Transitions](https://v3.vuejs.org/guide/transitions-overview.html)
- we're not limited to one root element, i.e:
```vue
//App.vue
        <transition name="fade" mode="out-in"> 
            <h2 v-if="flag" key="main">Hello World!</h2>
            <h2 v-else key="secondary">Another hello!</h2>
```
- this directive is considerev valid because the conditionals work alongside each other
- we need to add the key attribute to both elements with the unique value
- by default, vue will animate the second element in and animate the first element out; we can reverse this by setting `mode` attribute
- the `mode` determines the order of the animation (by default the value is in-out)


# Animating with CSS Animations

- CSS animation are a more avdanced way to animate elements
- they give you more control over your animations
- i.e:
```vue
//App.vue
<template>
  <button type="button" @click="flag= !flag">Toggle</button>
  
  <transition name="zoom">
    <h2 v-if="flag">Hello</h2>
  </transition>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      flag: false,
    };
  },
};
</script>

<style>
h2 {
  width: 400px;
  padding: 20px;
  margin: 20px;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s linear;
}

.fade-leave-to {
  transition: all 1s linear;
  opacity: 0;
}

.zoom-enter-active {
  animation: zoom-in 1s linear forwards;
  transition: all 1s linear;
}

.zoom-leave-active {
  animation: zoom-out 1s linear forwards;
  transition: all 1s linear;
}

.zoom-enter-from {
  opacity: 0;
}

.zoom-leave-to {
  opacity: 0;
}

@keyframes zoom-in {
  from {
    transform: scale(0, 0);
  }
  to {
    transform: scale(1, 1);
  }
}

@keyframes zoom-out {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0, 0);
  }
}
</style>
```
- if we use both transitions and animations with different duration, by default vue will use the duration with the longest time 
- if possible you want the duration to match
- if necesarry, vue allows you to decide which one has priority, by using the 'type' option: `<transition name="zoom" type="transition">`
- if we want an animation to play when the browser is refreshed, we need to add the `appear` property to the `transition` element: 
    `<transition name="zoom" type="transition" appear>`


# Animating with JavaScript

- Vue provides 3 hooks to use for both entering and leaving animation: `before-enter`, `enter`, `after-enter`, `before-leave`, `leave`, `after-leave`
- the entering animations are used for when the element is being inserted into the DOM
  - `before-enter`: is triggered before the animation starts; it allows you to prepare for anything you might need
  - `enter`: where you perform the animation itself; is where most of your code will be written
  - `after-enter`: called when the animation is finished; it allows you to do cleanup if necessary
- the leaving animation are used for when an element is being removed from the DOM
  - `before-leave`: triggered before the animation starts
  - `leave`: where you would perform the animation
  - `after-leave`: used after the animation is complete
- there are two additional events, called the cancelled events (it is possible to cancel animation): `enter-cancelled`, `leave-cancelled`
- i.e:
```vue
<template>
  <button type="button" @click="flag= !flag">Toggle</button>

  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    >
    <h2 v-if="flag">Hey</h2>
  </transition>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    beforeEnter(el) {
      console.log('before-enter event fired',el)
    },
    enter(el, done) {
      console.log('enter event fired',el)
      done();
    },
    afterEnter(el) {
      console.log('after-enter event fired',el)
    },
    beforeLeave(el) {
      console.log('before-leave event fired',el)
    },
    leave(el, done) {
      console.log('leave event fired',el)
      done();
    },
    afterLeave(el) {
      console.log('after-leave event fired',el)
    },
  },
};
```
- we will have a total of 6 functions
- each function is passed in an object called element
- the element argument contains info about the element that is currently being animated; you have complete freedom to change any of the properties on this object
- there is one more argument we can add, called `done`
- this parameter can only be used in 2 of the 6 functions: the `enter` and `leave` functions
- you're meant to perform the animation in both functions, but vue won't know when your animation is complete
- the `done` argument is a callback function that will tell Vue the animation is finished playing
- after this function has been called, Vue will proceed with adding or removing the element; you must call this function so that vue can do its job properly

- documentation for Web Animations API: [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
- this API allows us to perform animations efficiently and it's even more efficient than CSS
- an animation can only be played on an element
- i.e JS Zoom Animation (if the element is entering the document, it'll zoom into place, if it's leaving, it'll zoom out):
```vue
  //App.vue
  enter(el, done) {
    console.log('enter event fired',el)
    const animation = el.animate([{ transform: "scale3d(0,0,0)" }, {}], {
      duration: 1000,
    });
    animation.onfinish = () => {
      done();
    }
  },
  leave(el, done) {
    console.log('enter event fired',el)
    const animation = el.animate([{}, { transform: "scale3d(0,0,0)" }], {
      duration: 1000,
    });
    animation.onfinish = () => {
      done();
    }
    },
```
- the `animate()` function exists only on DOM objects, so it's not specific to Vue
- this will animate the element it's been called on
- it has 2 arguments:
  - the first one is an array of properties to animate
    - we can add as many objects as we want in the array
    - each object can be filled with CSS properties
  - the second argument we can pass is an object of settings
    - this will aloow us to change how the animation behaves from the duration to iterability
- the `animate()` function will return an object with events we can listen for
- the `onfinish` event gets emitted when the animation is finished
- the value for this must be a function that will be called when the animation is complete
- inside this function we'll call the `done()` function to let Vue know we're finished
- Vue prefers that you use CSS animations over JS animations; 
  - because of this, Vue will check if you have a CSS animation for the transition
  - if you don't, it will use your JS animation
  - because of this, youre animation takes up more resources than it has to
  - we can tell Vue directly we don't have a CSS animation by adding in the `<transition>` component the following property: `:css="false"`
  - this property will instruct Vue not to check for css animation
  - i.e:
```vue
  <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      :css="false"                  <---
  >
```

# CSS and JS Transitions

- we have the option of using both CSS classes and JS hooks to perform different jobs
- for example, you may use them to perform background tasks while the animation is handled with CSS (`css` property must be set to `true`)
- i.e:
```vue
<template>
  <button type="button" @click="flag= !flag">Toggle</button>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    :css="true"                 <---
    name="fade"                 <---
    >
    <h2 v-if="flag">Hey</h2>
  </transition>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    beforeEnter(el) {
      console.log('before-enter event fired',el)
    },
    enter(el) {
      console.log('enter event fired',el)
    },
    afterEnter(el) {
      console.log('after-enter event fired',el)
    },
    beforeLeave(el) {
      console.log('before-leave event fired',el)
    },
    leave(el) {
      console.log('enter event fired',el)
    },
    afterLeave(el) {
      console.log('after-leave event fired',el)
    },
  },
};
</script>

<style>
h2 {
  width: 400px;
  padding: 20px;
  margin: 20px;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s linear;
}
.fade-leave-to {
  transition: all 1s linear;
  opacity: 0;
}
.zoom-enter-active {
  animation: zoom-in 1s linear forwards;
  transition: all 1s linear;
}
.zoom-leave-active {
  animation: zoom-out 1s linear forwards;
  transition: all 1s linear;
}
.zoom-enter-from {
  opacity: 0;
}
.zoom-leave-to {
  opacity: 0;
}

@keyframes zoom-in {
  from {
    transform: scale(0, 0);
  }
  to {
    transform: scale(1, 1);
  }
}

@keyframes zoom-out {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0, 0);
  }
}
</style>
```

# Animating a List
- the `transition` component only works with single elements
- `transition-group` component is specifically for animating items and loop
  - you can't use the `mode` property
- the `key` attribute will help Vue to identify which item in the array belongs to which element
- Vue will add a class called `*-move` to elements that are being moved over
- Vue will prepand the name of the transition to the generated class name (i.e `fade-mode`)
- i.e:
```vue
  .fade-move {
    transition: all 1s linear;
  }
  
  .fade-leave-active {
    position: absolute;
  }
```
- by using `absolute` positioning, the item fading away will give up its space, forcing the other elements to move up

# Transition CSS Class Names

- *Animate.css* is a library that comes with predefined animations that can be used in any application
- documentation: [Animate.css](https://animate.style/)
- we can load animate.css through an external source: https://cdnjs.com/libraries/animate.css
  - to do this we need to add the following line in public/index.html file: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">`
  - to completely overwrite the names, we can use the following properties:
    - `enter-from-class=""`
    - `enter-active-class=""`
    - `enter-to-class=""`
    - `leave-from-class=""`
    - `leave-active-class=""`
    - `leave-to-class=""`
  - each class can be explicitely set by defining these properties on the `transition-group` component
  - i.e:
```vue
  // App.vue
    <transition-group name="fade"
      enter-active-class="animate__animated animate__flipInX"
      leave-active-class="animate__animated animate__flipOutX"
    >
    //[..]
  <style>
  .animate__flipOutX {
    position: absolute;
  }

  .animate__animated {
    animation-duration: 1.5s;
  }
```

# Static Assets Handling

- documentation: [Static Assets](https://cli.vuejs.org/guide/html-and-static-assets.html#static-assets-handling)
- Static assets can be handled in two different ways:
  - Imported in JavaScript or referenced in templates/CSS via relative paths. Such references will be handled by webpack.
  - Placed in the public directory and referenced via absolute paths. These assets will simply be copied and not go through webpack.