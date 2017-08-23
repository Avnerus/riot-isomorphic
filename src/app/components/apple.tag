<apple>
 <div class="apple">
     <h1>We sell apples:</h1>
     <ul>
         <li each="{ name, i in state.fruit.data.types  }">
             <div>{name}</div>
         </li>
     </ul>
     <div show='{ data }'>
         <button onclick={taste} type="button">Try one</button> 
     </div>
     <div if='{ tasteResult }'>
         <p> Tried a {tasteResult.type} and it was {tasteResult.result} </p>
     </div>
     <div if='{ tasteError }'>
        <p>{tasteError}</p>
     </div>
 </div>
 
 <style>
     .apple h1 {
         color: green;
     }
     .apple li {
         color: #aaffaa;
     }
 </style>
 <script>
    console.log("Init Apple tag");

    this.on('mount', () => {
        this.data = null;
    })

    this.state.fruit.on("fruit_data_updated", () => {
        this.data = this.state.fruit.data;
        this.tasteError = null;
        this.tasteResult = null;
        this.update();
    });

    this.taste = () => {
        let typeToTry = this.data.types[Math.floor((Math.random() * this.data.types.length))]; 
        console.log("Trying ", typeToTry);
        this.state.fruit.taste(typeToTry);
    }

    this.state.fruit.on('taste_result', (data) => {
      console.log("Taste result!", data);  
      this.tasteResult = data;
      this.update();
    });

    this.state.fruit.on('taste_error', (error) => {
      console.log("Taste error!", error.message);  
      this.tasteError = error.message;
      this.update();
    });
 </script>
</apple>
