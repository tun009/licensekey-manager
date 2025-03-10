<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
    <h1 class="text-6xl font-bold text-gray-300 dark:text-gray-700">404</h1>
    <h2 class="text-2xl font-semibold mt-4">Page Not Found</h2>
    <p class="text-muted-foreground mt-2 max-w-md">
      The page you are looking for doesn't exist or has been moved.
    </p>
    <router-link to="/" class="mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-md">
      Go to Dashboard
    </router-link>
  </div>
</template> 