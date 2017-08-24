<main>
    <h1> Hello world </h1>
    <account-status></account-status>
    <view ref="view"></view>

    <style>
        main {
            display: block;
            background-color: #FC87FF;
        }
    </style>

    <script>
        import { mount } from 'riot'
        import './account-status.tag'
        import './mall.tag'
        import './login.tag'

        this.on('mount', () => {
            console.log("Main mounted");
            console.log("Current view ", this.state.main.view);
            mount(this.refs.view, this.state.main.view);

            this.state.main.on('main_state_updated', this.viewUpdated);
        });

        this.on('unmount', () => {
            this.state.main.off('main_state_updated', this.viewUpdated);
        })

        viewUpdated(view) {
            console.log("Main state update!", view);
            mount(this.refs.view, view);
        }
    </script>
</main>
