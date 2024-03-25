<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Made With
      <VIcon
        icon="tabler-heart"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      By
      <a
        href="https://github.com/Cuongvth"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >VulanhCuong</a>
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href="https://www.facebook.com/profile.php?id=100063475292919"
        target="_blank"
        rel="noopener noreferrer"
      >Facebook</a>
      <a
        href="https://www.instagram.com/_cuonglibra_03/"
        target="_blank"
        rel="noopener noreferrer"
      >Instagram</a>
      <a
        href="mailto:cuongvth191023@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >Email</a>
    </span>
  </div>
</template>
