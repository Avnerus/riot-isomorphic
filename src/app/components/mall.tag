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
        console.log("Mall mounted!");
        if (this.state.fruit.currentFruit) {
            console.log("Mounting fruit", this.state.fruit.currentFruit);
            this.fruitTag = mount(this.refs.fruit, this.state.fruit.currentFruit)[0];
        }

        this.state.fruit.on('fruit_updated', this.fruitUpdate);
    });

    this.on('unmount', () => {
        console.log("Mall unmount!");
        this.state.fruit.off('fruit_updated', this.fruitUpdate);
        if (this.fruitTag) {
            this.fruitTag.unmount(true);                
            this.fruitTag = null;
        }
    })

    fruitUpdate (fruit) {
        console.log("Mall - fruit updated!!",fruit);
        if (fruit) {
            this.fruitTag = mount(this.refs.fruit, fruit)[0];
        } else if (this.fruitTag) {
            console.log("Unmounting fruit tag!");
            // Unmount the current fruit
            this.fruitTag = null;
        }
    }

 </script>
 </mall>
