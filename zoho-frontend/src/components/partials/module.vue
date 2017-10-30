<template>
  <v-layout column>
    <v-flex>
      <v-card hover class="card--flex-toolbar">
        <v-toolbar class="secondary toolbar--dense theme--dark">
          <v-toolbar-side-icon class="hidden-xs-only">
            <slot name="module-icon"></slot>
          </v-toolbar-side-icon>
          <slot name="module-title"></slot>
          <v-spacer class="hidden-xs-only"></v-spacer>
          <v-toolbar-side-icon class="hidden-xs-only">
            <v-icon style="cursor: pointer">keyboard_arrow_down</v-icon>
          </v-toolbar-side-icon>
        </v-toolbar>
        <v-card-media>
          <v-container grid-list-lg>
            <slot name="module-content"></slot>
          </v-container>
        </v-card-media>
        <v-divider></v-divider>
        <v-card-actions>
          <slot name="module-spacer"></slot>
          <slot name="module-action"></slot>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
