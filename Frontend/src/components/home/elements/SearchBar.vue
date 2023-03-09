<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let isFocused = ref(false);

let query = ref("");

let submit = async () => {
  
  if (query.value !== undefined && query.value !== null) {
    if (router.currentRoute.value.query !== query.value) {
      await router.push({ path: "/search", query: { query: query.value } });
      router.go(0);
    } else {
      await router.push({ path: "/search", query: { query: query.value } });
    }
  }
};
</script>

<template>
  <div class="right search p-6">
    <input
      type="search"
      v-model="query"
      required
      @keypress.enter="submit()"
      placeholder="Buscar libros..."
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <button
      class="absolute right-2 lg:right-0 top-4 px-4 py-2 bg-sky-500 text-white rounded-md"
      v-show="isFocused"
    >
      X
    </button>
  </div>
</template>

<style>
.clear-search {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.right {
  float: right;
}

input[type="search"]::-webkit-search-decoration,
.search input[type="search"]::-webkit-search-cancel-button {
  display: none;
}

.search input[type="search"] {
  outline: none;
  -webkit-appearance: textfield;
  -webkit-box-sizing: content-box;
  font-family: inherit;
  font-size: 100%;
  background: transparent
    url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEzOSAxMzkiIGhlaWdodD0iMTM5cHgiIGlkPSJGaW5kIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMzkgMTM5IiB3aWR0aD0iMTM5cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0xMjcuNTU4LDExMS45NjFMMTAwLjI0OSw4NC42NWM0LjY0LTcuMzg3LDcuMzMzLTE2LjExOCw3LjMzMy0yNS40ODhjMC0yNi41MDktMjEuNDktNDcuOTk2LTQ3Ljk5OC00Ny45OTYgIGMtMjYuNTA4LDAtNDcuOTk2LDIxLjQ4Ny00Ny45OTYsNDcuOTk2YzAsMjYuNTEsMjEuNDg3LDQ3Ljk5NSw0Ny45OTYsNDcuOTk1YzEwLjE5NywwLDE5LjY0Mi0zLjE4OCwyNy40MTQtOC42MDVsMjYuOTg0LDI2Ljk4NiAgYzEuODc1LDEuODczLDQuMzMzLDIuODA2LDYuNzg4LDIuODA2YzIuNDU4LDAsNC45MTMtMC45MzMsNi43OTEtMi44MDZDMTMxLjMwOCwxMjEuNzg3LDEzMS4zMDgsMTE1LjcxMSwxMjcuNTU4LDExMS45NjF6ICAgTTU5LjU4NCw5MS42MDdjLTE3LjkxNywwLTMyLjQ0My0xNC41MjUtMzIuNDQzLTMyLjQ0M1M0MS42NjcsMjYuNzIsNTkuNTg0LDI2LjcyYzE3LjkxOCwwLDMyLjQ0MywxNC41MjYsMzIuNDQzLDMyLjQ0NCAgUzc3LjUwMiw5MS42MDcsNTkuNTg0LDkxLjYwN3oiLz48L3N2Zz4=")
    no-repeat 0 center;
  position: absolute;
  top: 6px;
  right: 0;
  background-size: 30px;
  border: none;
  border-bottom: 3px solid transparent;
  color: transparent;
  padding: 10px;
  width: 10px;
  margin: 10px 0;
  cursor: pointer;

  background-color: white;
}

.search input[type="search"]:focus {
  width: 270px;
  padding-left: 30px;
  background: none;
  border-bottom: 3px solid #333;
  color: #333;
  cursor: auto;
  background: white;
}

@media (min-width: 200px) {
  .search input[type="search"] {
    margin-right: 10px;
  }
  .search input[type="search"]:focus {
    width: 275px;
  }
}

@media (min-width: 300px) {
  .search input[type="search"] {
    margin-right: 10px;
  }
  .search input[type="search"]:focus {
    width: 287px;
  }
}

@media (min-width: 370px) {
  .search input[type="search"] {
    margin-right: 10px;
  }
  .search input[type="search"]:focus {
    width: 300px;
  }
}

@media (min-width: 390px) {
  .search input[type="search"] {
    margin-right: 10px;
  }
  .search input[type="search"]:focus {
    width: 320px;
  }
}

@media (min-width: 400px) {
  .search input[type="search"] {
    margin-right: 10px;
  }
  .search input[type="search"]:focus {
    width: 340px;
  }
}

@media (min-width: 540px) {
  .search input[type="search"] {
    margin-right: 10px;
  }
  .search input[type="search"]:focus {
    width: 425px;
  }
}

@media (min-width: 800px) {
  .search input[type="search"] {
    margin-right: 0;
  }
  .search input[type="search"]:focus {
    width: 460px;
  }
}

.search input[type="search"]:hover {
  border-bottom: 3px solid #333;
}

input::-webkit-input-placeholder {
  color: transparent;
}
input:focus::-webkit-input-placeholder {
  color: #333;
}
/* Firefox < 19 */
input:-moz-placeholder {
  color: transparent;
}
input:focus:-moz-placeholder {
  color: #333;
}
/* Firefox > 19 */
input::-moz-placeholder {
  color: transparent;
}
input:focus::-moz-placeholder {
  color: #333;
}
/* Internet Explorer 10 */
input:-ms-input-placeholder {
  color: transparent;
}
input:focus:-ms-input-placeholder {
  color: #333;
}
</style>
