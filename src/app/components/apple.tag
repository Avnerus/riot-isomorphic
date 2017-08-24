<apple>
 <div class="apple">
     <h1>We sell apples:</h1>
     <ul>
         <li each="{ name, i in state.fruit.data.types  }">
             <div>{name}</div>
         </li>
     </ul>
     <div show='{ this.state.fruit.data }'>
         <button onclick={taste} type="button">Try one</button> 
     </div>
     <div if='{ tasteResultMessage }'>
         <p> Tried a {tasteResultMessage.type} and it was {tasteResultMessage.result} </p>
     </div>
     <div if='{ tasteErrorMessage }'>
        <p>{tasteErrorMessage}</p>
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
        console.log("Apple mount");
        this.tasteErrorMessage = null;
        this.tasteResultMessage = null;

        this.state.fruit.on('taste_result', this.tasteResult);
        this.state.fruit.on('taste_error',  this.tasteError);
        this.state.fruit.on("fruit_data_updated", this.dataUpdated);

    })

    this.on('unmount', () => {
        console.log("Apple unmount");
        this.state.fruit.off('taste_result', this.tasteResult);
        this.state.fruit.off('taste_error', this.tasteError);
        this.state.fruit.off('fruit_data_updated', this.dataUpdated);
    })


    dataUpdated () {
        console.log("Apple data update!");
        this.update();
    }

    taste () {
        let typeToTry = this.state.fruit.data.types[Math.floor((Math.random() * this.state.fruit.data.types.length))]; 
        console.log("Trying ", typeToTry);
        this.state.fruit.taste(typeToTry);
    }

    tasteResult (data) {
      console.log("Apple taste result!", data);  
      this.tasteResultMessage = data;
      this.update();
    }

    tasteError(error) {
      console.log("Taste error!", error);  
      this.tasteErrorMessage = error.message;
      this.update();
    }

 </script>
</apple>
