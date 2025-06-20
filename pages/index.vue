<template>
  <div class="p-8 space-y-6">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Tailwind CSS Theme Demo</h1>
    
    <!-- Font demonstration -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800">Poppins Font Weights</h2>
      
      <div class="space-y-2">
        <p class="font-light text-lg">Light (300) - This is Poppins Light</p>
        <p class="font-normal text-lg">Normal (400) - This is Poppins Regular</p>
        <p class="font-medium text-lg">Medium (500) - This is Poppins Medium</p>
        <p class="font-semibold text-lg">Semibold (600) - This is Poppins Semibold</p>
        <p class="font-bold text-lg">Bold (700) - This is Poppins Bold</p>
        <p class="font-extrabold text-lg">Extrabold (800) - This is Poppins Extrabold</p>
        <p class="font-black text-lg">Black (900) - This is Poppins Black</p>
      </div>
    </div>
    
    <!-- Primary color variants -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800">Primary Color Variants</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div class="bg-primary-50 text-primary-900 p-4 rounded-lg text-center">
          <div class="text-sm font-medium">50</div>
          <div class="text-xs">bg-primary-50</div>
        </div>
        <div class="bg-primary-100 text-primary-900 p-4 rounded-lg text-center">
          <div class="text-sm font-medium">100</div>
          <div class="text-xs">bg-primary-100</div>
        </div>
        <div class="bg-primary-200 text-primary-900 p-4 rounded-lg text-center">
          <div class="text-sm font-medium">200</div>
          <div class="text-xs">bg-primary-200</div>
        </div>
        <div class="bg-primary-300 text-primary-900 p-4 rounded-lg text-center">
          <div class="text-sm font-medium">300</div>
          <div class="text-xs">bg-primary-300</div>
        </div>
        <div class="bg-primary-400 text-white p-4 rounded-lg text-center">
          <div class="text-sm font-medium">400</div>
          <div class="text-xs">bg-primary-400</div>
        </div>
        <div class="bg-primary-500 text-white p-4 rounded-lg text-center">
          <div class="text-sm font-medium">500</div>
          <div class="text-xs">bg-primary-500</div>
        </div>
        <div class="bg-primary-600 text-white p-4 rounded-lg text-center">
          <div class="text-sm font-medium">600</div>
          <div class="text-xs">bg-primary-600</div>
        </div>
        <div class="bg-primary-700 text-white p-4 rounded-lg text-center">
          <div class="text-sm font-medium">700</div>
          <div class="text-xs">bg-primary-700</div>
        </div>
        <div class="bg-primary-800 text-white p-4 rounded-lg text-center">
          <div class="text-sm font-medium">800</div>
          <div class="text-xs">bg-primary-800</div>
        </div>
        <div class="bg-primary-900 text-white p-4 rounded-lg text-center">
          <div class="text-sm font-medium">900</div>
          <div class="text-xs">bg-primary-900</div>
        </div>
        <div class="bg-primary-950 text-white p-4 rounded-lg text-center">
          <div class="text-sm font-medium">950</div>
          <div class="text-xs">bg-primary-950</div>
        </div>
      </div>
    </div>

    <!-- Usage examples -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800">Usage Examples</h2>
      
      <div class="space-y-3">
        <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium">
          Primary Button
        </button>
        
        <div class="bg-primary-50 border border-primary-200 p-4 rounded-lg">
          <h3 class="text-primary-900 font-semibold">Info Card</h3>
          <p class="text-primary-700 text-sm mt-1">This uses primary color variants for a cohesive design.</p>
        </div>
        
        <div class="bg-white border-2 border-primary-300 p-4 rounded-lg">
          <h3 class="text-primary-800 font-semibold">Bordered Card</h3>
          <p class="text-gray-600 text-sm mt-1">Using primary colors for borders and text.</p>
        </div>
      </div>
    </div>
  </div>
</template>