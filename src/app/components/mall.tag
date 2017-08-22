 <mall>
 <h1>Welcome to the fruit shopping mall</h1>
 <a href="/banana">Visit banana store</a>
 <a href="/apple">Visit apple store</a>
 <fruit ref="fruit"></fruit>

 <!--apple if={stores.fruit.currentFruit=='apple'}></apple>
 <banana if={stores.fruit.currentFruit=='banana'}></banana-->

 <style>
     mall {
        a {
            display: flex;
        }
     }
 </style>

 <script>
    this.state.on('fruit_updated', (fruit) => {
        console.log("Mall - fruit updated!!");
        this.update();
    });*/
 </script>
 </mall>
