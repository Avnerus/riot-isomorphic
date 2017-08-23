<banana>
 <div class="banana">
     <h1>-=We sell bananas=- :</h1>
     <ul>
        <li each="{ name, i in state.fruit.data.types  }">
            <div>{name}</div>
        </li>
     </ul>
 </div>
 <style>
     .banana h1 {
         color: yellow;
     }
     .banana li {
         color: #eeff00;
     }
 </style>
 <script>
    this.state.fruit.on("fruit_data_updated", () => {
         this.update();
    });
 </script>
</banana>


