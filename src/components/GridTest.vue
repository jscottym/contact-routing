<template>
  <div class="parent-grid">
    <div class="left-column">Left Column</div>

    <div class="nested-grid level-1">
      <div class="grid-item item-1">
        Item 1
        <div class="nested-grid level-2">
          <div class="grid-item item-2">
            Item 2
            <div class="nested-grid level-3">
              <div class="grid-item item-3">
                Item 3
                <div class="nested-grid level-4">
                  <div class="grid-item item-4">Item 4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.parent-grid {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.left-column {
  flex: 1;
  background-color: lightgray;
}

.nested-grid {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.grid-item {
  flex: 1; /* Ensures equal width */
  background-color: lightblue;
  padding: 1rem;
  border: 1px solid #ccc;
}

</style>
