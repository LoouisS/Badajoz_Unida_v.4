'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">badajoz-unida documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-d51479bd08ae56e1c15b0beeadfddc0dfbe673003111ee28a9152548422bb065d6322ffaf37f30b9c056daa6ac844cbd230ad8ee907a6160506c801223929ecd"' : 'data-target="#xs-components-links-module-AppModule-d51479bd08ae56e1c15b0beeadfddc0dfbe673003111ee28a9152548422bb065d6322ffaf37f30b9c056daa6ac844cbd230ad8ee907a6160506c801223929ecd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d51479bd08ae56e1c15b0beeadfddc0dfbe673003111ee28a9152548422bb065d6322ffaf37f30b9c056daa6ac844cbd230ad8ee907a6160506c801223929ecd"' :
                                            'id="xs-components-links-module-AppModule-d51479bd08ae56e1c15b0beeadfddc0dfbe673003111ee28a9152548422bb065d6322ffaf37f30b9c056daa6ac844cbd230ad8ee907a6160506c801223929ecd"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-3d9b080ac96479c26381cea06caebc7eb366ccfc7e8d01bda1ae1f536b2ee03aeed061e5d6c5073033783e1d933f745dc7621d4e580f5b6a30b066388c76b6be"' : 'data-target="#xs-components-links-module-AuthModule-3d9b080ac96479c26381cea06caebc7eb366ccfc7e8d01bda1ae1f536b2ee03aeed061e5d6c5073033783e1d933f745dc7621d4e580f5b6a30b066388c76b6be"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-3d9b080ac96479c26381cea06caebc7eb366ccfc7e8d01bda1ae1f536b2ee03aeed061e5d6c5073033783e1d933f745dc7621d4e580f5b6a30b066388c76b6be"' :
                                            'id="xs-components-links-module-AuthModule-3d9b080ac96479c26381cea06caebc7eb366ccfc7e8d01bda1ae1f536b2ee03aeed061e5d6c5073033783e1d933f745dc7621d4e580f5b6a30b066388c76b6be"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EventModule.html" data-type="entity-link" >EventModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EventModule-c21b159e959f573530a1d3cdc94b004ef63160a0118844c457e303d44ad23275024dfecc7cc0075e3a1b9a29d56dc6eb9319d471c14b1d569e9c8c1852b971bf"' : 'data-target="#xs-components-links-module-EventModule-c21b159e959f573530a1d3cdc94b004ef63160a0118844c457e303d44ad23275024dfecc7cc0075e3a1b9a29d56dc6eb9319d471c14b1d569e9c8c1852b971bf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EventModule-c21b159e959f573530a1d3cdc94b004ef63160a0118844c457e303d44ad23275024dfecc7cc0075e3a1b9a29d56dc6eb9319d471c14b1d569e9c8c1852b971bf"' :
                                            'id="xs-components-links-module-EventModule-c21b159e959f573530a1d3cdc94b004ef63160a0118844c457e303d44ad23275024dfecc7cc0075e3a1b9a29d56dc6eb9319d471c14b1d569e9c8c1852b971bf"' }>
                                            <li class="link">
                                                <a href="components/EventComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventRoutingModule.html" data-type="entity-link" >EventRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EventsModule.html" data-type="entity-link" >EventsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EventsModule-91ef34dc58a8fc79ad8d7638a115b4dfd298983b469277fd333be728b7badf106c28f151e1d60607bb021c8be8b023d3bf3e49f4cddbe244c93e764829dce022"' : 'data-target="#xs-components-links-module-EventsModule-91ef34dc58a8fc79ad8d7638a115b4dfd298983b469277fd333be728b7badf106c28f151e1d60607bb021c8be8b023d3bf3e49f4cddbe244c93e764829dce022"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EventsModule-91ef34dc58a8fc79ad8d7638a115b4dfd298983b469277fd333be728b7badf106c28f151e1d60607bb021c8be8b023d3bf3e49f4cddbe244c93e764829dce022"' :
                                            'id="xs-components-links-module-EventsModule-91ef34dc58a8fc79ad8d7638a115b4dfd298983b469277fd333be728b7badf106c28f151e1d60607bb021c8be8b023d3bf3e49f4cddbe244c93e764829dce022"' }>
                                            <li class="link">
                                                <a href="components/EventsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventsRoutingModule.html" data-type="entity-link" >EventsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FormLoginModule.html" data-type="entity-link" >FormLoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormLoginModule-f7832a950976bc37d6df76ccf1bc66007a82863beb79d40312cd8c6d3aa4d4ab316627681fe9170b61db1904ac6b5ae46514fca41a344b9db5113089f8c1a169"' : 'data-target="#xs-components-links-module-FormLoginModule-f7832a950976bc37d6df76ccf1bc66007a82863beb79d40312cd8c6d3aa4d4ab316627681fe9170b61db1904ac6b5ae46514fca41a344b9db5113089f8c1a169"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormLoginModule-f7832a950976bc37d6df76ccf1bc66007a82863beb79d40312cd8c6d3aa4d4ab316627681fe9170b61db1904ac6b5ae46514fca41a344b9db5113089f8c1a169"' :
                                            'id="xs-components-links-module-FormLoginModule-f7832a950976bc37d6df76ccf1bc66007a82863beb79d40312cd8c6d3aa4d4ab316627681fe9170b61db1904ac6b5ae46514fca41a344b9db5113089f8c1a169"' }>
                                            <li class="link">
                                                <a href="components/FormLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormLoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormLoginRoutingModule.html" data-type="entity-link" >FormLoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FormRegisterModule.html" data-type="entity-link" >FormRegisterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormRegisterModule-7d8c2eb70ea3cba70714abfcfc431f4f904ab27d4831eab7eb7bcdcfbd2b02f13172085266bafc985ac35f71eeb7b3168e6cce467a860930268dff35e6dbeff5"' : 'data-target="#xs-components-links-module-FormRegisterModule-7d8c2eb70ea3cba70714abfcfc431f4f904ab27d4831eab7eb7bcdcfbd2b02f13172085266bafc985ac35f71eeb7b3168e6cce467a860930268dff35e6dbeff5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormRegisterModule-7d8c2eb70ea3cba70714abfcfc431f4f904ab27d4831eab7eb7bcdcfbd2b02f13172085266bafc985ac35f71eeb7b3168e6cce467a860930268dff35e6dbeff5"' :
                                            'id="xs-components-links-module-FormRegisterModule-7d8c2eb70ea3cba70714abfcfc431f4f904ab27d4831eab7eb7bcdcfbd2b02f13172085266bafc985ac35f71eeb7b3168e6cce467a860930268dff35e6dbeff5"' }>
                                            <li class="link">
                                                <a href="components/FormRegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormRegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormRegisterRoutingModule.html" data-type="entity-link" >FormRegisterRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GestionEventosModule.html" data-type="entity-link" >GestionEventosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GestionEventosModule-f957d1fb4131243b422c8dcc3660d8dacf82255d67837234ff74c82524dd583428db7040a6e128a254ab2daa927f019d31da895d6a0c4e9071a79d1d02022a3f"' : 'data-target="#xs-components-links-module-GestionEventosModule-f957d1fb4131243b422c8dcc3660d8dacf82255d67837234ff74c82524dd583428db7040a6e128a254ab2daa927f019d31da895d6a0c4e9071a79d1d02022a3f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GestionEventosModule-f957d1fb4131243b422c8dcc3660d8dacf82255d67837234ff74c82524dd583428db7040a6e128a254ab2daa927f019d31da895d6a0c4e9071a79d1d02022a3f"' :
                                            'id="xs-components-links-module-GestionEventosModule-f957d1fb4131243b422c8dcc3660d8dacf82255d67837234ff74c82524dd583428db7040a6e128a254ab2daa927f019d31da895d6a0c4e9071a79d1d02022a3f"' }>
                                            <li class="link">
                                                <a href="components/CrearEventoModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CrearEventoModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventosTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventosTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionEventosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GestionEventosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GestionEventosRoutingModule.html" data-type="entity-link" >GestionEventosRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-1946d8d86a0b6d0d9dccb2a1dc1cfd53d1c6085540bf7eddbf22cdc903a8124c4f69f21c55d2e3f92dcc04730836c717a25a7b15644fa07a0bc36c54d50efe59"' : 'data-target="#xs-components-links-module-HomeModule-1946d8d86a0b6d0d9dccb2a1dc1cfd53d1c6085540bf7eddbf22cdc903a8124c4f69f21c55d2e3f92dcc04730836c717a25a7b15644fa07a0bc36c54d50efe59"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-1946d8d86a0b6d0d9dccb2a1dc1cfd53d1c6085540bf7eddbf22cdc903a8124c4f69f21c55d2e3f92dcc04730836c717a25a7b15644fa07a0bc36c54d50efe59"' :
                                            'id="xs-components-links-module-HomeModule-1946d8d86a0b6d0d9dccb2a1dc1cfd53d1c6085540bf7eddbf22cdc903a8124c4f69f21c55d2e3f92dcc04730836c717a25a7b15644fa07a0bc36c54d50efe59"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IndexModule.html" data-type="entity-link" >IndexModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IndexModule-5335178f436e071838be67754c91b297f57134b7d9701e8a988bd85210bc9903f2703b7d1d4e12f4f4bffebcb819dbbb43cb66d5e92adb86b70be914b47d27e7"' : 'data-target="#xs-components-links-module-IndexModule-5335178f436e071838be67754c91b297f57134b7d9701e8a988bd85210bc9903f2703b7d1d4e12f4f4bffebcb819dbbb43cb66d5e92adb86b70be914b47d27e7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IndexModule-5335178f436e071838be67754c91b297f57134b7d9701e8a988bd85210bc9903f2703b7d1d4e12f4f4bffebcb819dbbb43cb66d5e92adb86b70be914b47d27e7"' :
                                            'id="xs-components-links-module-IndexModule-5335178f436e071838be67754c91b297f57134b7d9701e8a988bd85210bc9903f2703b7d1d4e12f4f4bffebcb819dbbb43cb66d5e92adb86b70be914b47d27e7"' }>
                                            <li class="link">
                                                <a href="components/IndexComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndexComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndexRoutingModule.html" data-type="entity-link" >IndexRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MyEventsModule.html" data-type="entity-link" >MyEventsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MyEventsModule-b45d1d898099403c92f4ffa2b6f275e6776b50cb5b87cb301af9ff9526e879e61f29666597d69f16bca40536f263546e35c83c609d4a397933fa9bef3c91f8cd"' : 'data-target="#xs-components-links-module-MyEventsModule-b45d1d898099403c92f4ffa2b6f275e6776b50cb5b87cb301af9ff9526e879e61f29666597d69f16bca40536f263546e35c83c609d4a397933fa9bef3c91f8cd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MyEventsModule-b45d1d898099403c92f4ffa2b6f275e6776b50cb5b87cb301af9ff9526e879e61f29666597d69f16bca40536f263546e35c83c609d4a397933fa9bef3c91f8cd"' :
                                            'id="xs-components-links-module-MyEventsModule-b45d1d898099403c92f4ffa2b6f275e6776b50cb5b87cb301af9ff9526e879e61f29666597d69f16bca40536f263546e35c83c609d4a397933fa9bef3c91f8cd"' }>
                                            <li class="link">
                                                <a href="components/MyEventsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MyEventsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MyEventsRoutingModule.html" data-type="entity-link" >MyEventsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link" >PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PipesModule-43c9861f3fced4431eb0e7222b117bdf5b981e6185e248c335707bd1346db0f89705215c4cd36ead5ea470e47fbd73563e39ee4d8b91a78bac6813c31808a48e"' : 'data-target="#xs-pipes-links-module-PipesModule-43c9861f3fced4431eb0e7222b117bdf5b981e6185e248c335707bd1346db0f89705215c4cd36ead5ea470e47fbd73563e39ee4d8b91a78bac6813c31808a48e"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-43c9861f3fced4431eb0e7222b117bdf5b981e6185e248c335707bd1346db0f89705215c4cd36ead5ea470e47fbd73563e39ee4d8b91a78bac6813c31808a48e"' :
                                            'id="xs-pipes-links-module-PipesModule-43c9861f3fced4431eb0e7222b117bdf5b981e6185e248c335707bd1346db0f89705215c4cd36ead5ea470e47fbd73563e39ee4d8b91a78bac6813c31808a48e"' }>
                                            <li class="link">
                                                <a href="pipes/CortarTextoPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CortarTextoPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfileModule-fd9956d0011ac79e8c8615b48fb4d26cda9ea90382374e90c0e79e1b22e867ace513053cb6ec0d90d0766a42d7c8a1edb225dde9863198fddbe3e6e6a6555eb4"' : 'data-target="#xs-components-links-module-ProfileModule-fd9956d0011ac79e8c8615b48fb4d26cda9ea90382374e90c0e79e1b22e867ace513053cb6ec0d90d0766a42d7c8a1edb225dde9863198fddbe3e6e6a6555eb4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-fd9956d0011ac79e8c8615b48fb4d26cda9ea90382374e90c0e79e1b22e867ace513053cb6ec0d90d0766a42d7c8a1edb225dde9863198fddbe3e6e6a6555eb4"' :
                                            'id="xs-components-links-module-ProfileModule-fd9956d0011ac79e8c8615b48fb4d26cda9ea90382374e90c0e79e1b22e867ace513053cb6ec0d90d0766a42d7c8a1edb225dde9863198fddbe3e6e6a6555eb4"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileRoutingModule.html" data-type="entity-link" >ProfileRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-ef5e5bce2394ddb01f53e42afe2d9ce94b7ff8b0a8b7f8336761317c97c5906d065396b6bf3d98aa5c6b3be4c76862dc2ef8ae196a63bed255292dd521446880"' : 'data-target="#xs-components-links-module-SharedModule-ef5e5bce2394ddb01f53e42afe2d9ce94b7ff8b0a8b7f8336761317c97c5906d065396b6bf3d98aa5c6b3be4c76862dc2ef8ae196a63bed255292dd521446880"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-ef5e5bce2394ddb01f53e42afe2d9ce94b7ff8b0a8b7f8336761317c97c5906d065396b6bf3d98aa5c6b3be4c76862dc2ef8ae196a63bed255292dd521446880"' :
                                            'id="xs-components-links-module-SharedModule-ef5e5bce2394ddb01f53e42afe2d9ce94b7ff8b0a8b7f8336761317c97c5906d065396b6bf3d98aa5c6b3be4c76862dc2ef8ae196a63bed255292dd521446880"' }>
                                            <li class="link">
                                                <a href="components/CardsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarouselComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/JwtDto.html" data-type="entity-link" >JwtDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUsuario.html" data-type="entity-link" >LoginUsuario</a>
                            </li>
                            <li class="link">
                                <a href="classes/Model.html" data-type="entity-link" >Model</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModelNewEvent.html" data-type="entity-link" >ModelNewEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/NuevoUsuario.html" data-type="entity-link" >NuevoUsuario</a>
                            </li>
                            <li class="link">
                                <a href="classes/Producto.html" data-type="entity-link" >Producto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriasService.html" data-type="entity-link" >CategoriasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventosService.html" data-type="entity-link" >EventosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IdiomasService.html" data-type="entity-link" >IdiomasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidadoresService.html" data-type="entity-link" >ValidadoresService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ProdInterceptorService.html" data-type="entity-link" >ProdInterceptorService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ProdGuardService.html" data-type="entity-link" >ProdGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});