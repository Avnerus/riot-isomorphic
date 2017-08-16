<main>
    <h1> Hello world </h1>
    <view ref="view"></view>

    <style>
        main {
            display: block;
            background-color: pink;
        }
    </style>

    <script>
        import { mount } from 'riot'
        import './mall.tag'

        this.on('mount', () => {
            console.log("Main mounted");
            console.log("Current view ", this.state.main.view);
            mount(this.refs.view, this.state.main.view);
        });
        /*
        this.dispatcher.on('main_state_updated', () => {
            this.update();
        });*/
    </script>
</main>
