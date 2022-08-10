<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
      <h1>TO DO LIST</h1>
      <to-do-form @task-added="AppendList"></to-do-form>
      <h2>Book list from local</h2>
      <book-item v-for="book in books" :key="book.id" :title="book.title" />
      <button type="submit" class="btn btn__primary btn__lg" @click="addBook">Add Book</button>
      <h2>{{listSummary}}</h2>
      <ul aria-labelledby="list-summary" class="stack-large">
        <li v-for="(item, index) in ToDoItems" :key="index">
           <to-do-item :label="item.label" :done="item.done" :id="item.id" 
              @checkbox-change="updateDoneStatus(item.id)"
              @item-deleted="deleteToDo(item.id)"
              @item-changed="editToDo(item.id, $event)"></to-do-item>
        </li>
       
      </ul>
      
    <!-- <HelloWorld  msg="Welcome to Your Vue.js App"/> -->
    <h2>smart quotes here; total {{totalQuotes}}</h2>
    <quote-item v-for="(quote, index) in smartQuotes" :key="'quote-' + index" :quote="quote.quote" :author="quote.author"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ToDoItem from './components/ToDoItem.vue';
import ToDoForm from './components/ToDoForm.vue';
import uniqueId from 'lodash.uniqueid';
import QuoteItem from './components/QuoteItem.vue';
import BookItem from './components/BookItem.vue';
import $ from 'jquery';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    ToDoItem,
    ToDoForm,
    QuoteItem,
    BookItem,
  },
  data() {
    return {
     ToDoItems: [
        { id: uniqueId('todo-'), label: 'Learn Vue', done: false },
        { id: uniqueId('todo-'), label: 'Create a Vue project with the CLI', done: true },
        { id: uniqueId('todo-'), label: 'Have fun', done: true },
        { id: uniqueId('todo-'), label: 'Create a to-do list', done: false }
      ], 
      smartQuotes: new Array(),
      totalQuotes : {
        type: Number
      },
      errorMessgae: '',
      currentPage: 1,
      books: new Array(),
    };
  },
  computed: {
    listSummary() {
      const numberFinishedItems = this.ToDoItems.filter((item) =>item.done).length
      return `${numberFinishedItems} out of ${this.ToDoItems.length} items completed`;
    }
  },
  methods: {
    addBook() {
      let postAPI = `http://localhost:8080/api/add/book`;
      let newBook = {
        title: 'post new book'
      };
      fetch(postAPI, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(newBook)
        })
        .then(response => console.log(response))
        .catch((error) => {
          console.log(error)
        })
    },
    AppendList (newtask) {
      this.ToDoItems.push({
        id: uniqueId('todo-'),
        label: newtask,
        done: false
      });
    },
    updateDoneStatus(toDoId) {
      let updateTarget = this.ToDoItems.find(e => e.id === toDoId);
      updateTarget.done = !updateTarget.done;
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId);
      this.ToDoItems.splice(itemIndex, 1);
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToEdit.label = newLabel;
    },
    nextPage() {
      const {
          scrollTop,
          scrollHeight,
          clientHeight
      } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5 ) {
        let APIUrl = `https://api.javascripttutorial.net/v1/quotes/?page=` + this.currentPage + `&limit=10`;
  
        fetch(APIUrl)
          .then(response => response.json())
          .then( data => {
            this.currentPage = this.currentPage +1;
            this.smartQuotes = this.smartQuotes.concat(data.data)
          });
      }
    },
  },
  mounted() {
    
    let APIUrl = `https://api.javascripttutorial.net/v1/quotes/`;
    let localAPI = `http://localhost:8080/api/books`;

    console.log('mounted', APIUrl, localAPI );

    fetch(APIUrl)
      .then( response => response.json())
      .then( data => {
        this.totalQuotes = data.total;
        this.smartQuotes = this.smartQuotes.concat(data.data);
      }).catch((error) => {
        console.log(error)
      });

      $.ajax({
        url: localAPI
      }).done( data => {
          this.books = this.books.concat(data.data);
          console.log('books', this.books)
      });

      // fetch(localAPI)
      //   .then(response => response.json())
      //   .then((data) => {
      //     this.books = this.books.concat(data.data);
      //     console.log('books', this.books)
      //   } )
      //   .catch((error) => {
      //     console.log(error)
      //   })

    window.addEventListener('scroll', this.nextPage);
  }
}

</script>

<style>
/* Global styles */
.btn {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
.btn-group > * + * {
  margin-left: 0.8rem;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*="__lg"] {
  display: inline-block;
  width: 100%;
  font-size: 1.9rem;
}
[class*="__lg"]:not(:last-child) {
  margin-bottom: 1rem;
}
@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 2.4rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*="stack"] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 2.8rem;
  }
}
/* End global styles */
#app {
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 550px) {
  #app {
    padding: 4rem;
  }
}
#app > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}

</style>
