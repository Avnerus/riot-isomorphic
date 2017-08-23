 <mall>
 <div class="mall">
     <h1>Welcome to the fruit shopping mall</h1>
     <a href="/banana">Visit banana store</a>
     <a href="/apple">Visit apple store</a>
     <fruit ref="fruit"></fruit>
 </div>

 <style>
     .mall {
        a {
            display: flex;
        }
     }
 </style>

 <script>
    import { mount } from 'riot'
    import './apple.tag'
    import './banana.tag'

    this.on('mount', () => {
        if (this.state.fruit.currentFruit) {
            mount(this.refs.fruit, this.state.fruit.currentFruit);
        }
    });

    this.state.fruit.on('fruit_updated', (fruit) => {
        console.log("Mall - fruit updated!!",fruit, this.refs);
        mount(this.refs.fruit, fruit);
    });
 </script>
 </mall>
