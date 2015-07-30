# uni-modal

A simple angular modal directive.


```html
<style>
  .uni-modal-hider {
    //Style the modal hider like so. It will be appended to $document.body.
  }
</style>

<uni-modal shown="foo" modal-show="shownCount++; logIt()" modal-hide="hideCount++; logIt();">
  <div>Content goes here</div>
</uni-modal>
```
