<template>
  <nav class="mt-3">
    <ul class="pagination d-flex justify-content-center">
      <li class="page-item" :class="{'disabled': !pagination.has_pre}">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click="goPage( pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{'active': pagination.current_page === page}"
        @click="goPage(page)"
      >
        <a class="page-link" href="#">{{page}}</a>
      </li>
      <li class="page-item" :class="{'disabled':!pagination.has_next}">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click="goPage(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["pagination"],
  methods: {
    goPage(page) {
  
      this.$emit("gopage", page);
    }
  }
};
</script>