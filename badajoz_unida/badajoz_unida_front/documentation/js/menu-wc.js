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
                                            'data-target="#components-links-module-AppModule-4a00684499243a5e2da58c7f6ab4cbaa811f349d59bc26a8839b6408200d1ca39abd5f9d769a3956e14426ba349b174f877dd72aeb977fbc58cdf72310c3d494"' : 'data-target="#xs-components-links-module-AppModule-4a00684499243a5e2da58c7f6ab4cbaa811f349d59bc26a8839b6408200d1ca39abd5f9d769a3956e14426ba349b174f877dd72aeb977fbc58cdf72310c3d494"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4a00684499243a5e2da58c7f6ab4cbaa811f349d59bc26a8839b6408200d1ca39abd5f9d769a3956e14426ba349b174f877dd72aeb977fbc58cdf72310c3d494"' :
                                            'id="xs-components-links-module-AppModule-4a00684499243a5e2da58c7f6ab4cbaa811f349d59bc26a8839b6408200d1ca39abd5f9d769a3956e14426ba349b174f877dd72aeb977fbc58cdf72310c3d494"' }>
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
                                <a href="modules/DirectivesModule.html" data-type="entity-link" >DirectivesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-DirectivesModule-a5748e7a084d760c032b434e8f36ac2338c5e9b33bf1a0e5b467c2f87de0d08256b37e3c75f4faba3c4dd866c06bbb1b2539913a577e68e7dcd1b21f6ddd3428"' : 'data-target="#xs-directives-links-module-DirectivesModule-a5748e7a084d760c032b434e8f36ac2338c5e9b33bf1a0e5b467c2f87de0d08256b37e3c75f4faba3c4dd866c06bbb1b2539913a577e68e7dcd1b21f6ddd3428"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-DirectivesModule-a5748e7a084d760c032b434e8f36ac2338c5e9b33bf1a0e5b467c2f87de0d08256b37e3c75f4faba3c4dd866c06bbb1b2539913a577e68e7dcd1b21f6ddd3428"' :
                                        'id="xs-directives-links-module-DirectivesModule-a5748e7a084d760c032b434e8f36ac2338c5e9b33bf1a0e5b467c2f87de0d08256b37e3c75f4faba3c4dd866c06bbb1b2539913a577e68e7dcd1b21f6ddd3428"' }>
                                        <li class="link">
                                            <a href="directives/NoImageDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoImageDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventModule.html" data-type="entity-link" >EventModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EventModule-0d236314463167a8c764468c55e6d4ce56a1a45bd3952bd47b87838b8aee4e515b612275124de8d8767f3ab3c251ebab0b08f6e017f0008929028e2f31ef7e2b"' : 'data-target="#xs-components-links-module-EventModule-0d236314463167a8c764468c55e6d4ce56a1a45bd3952bd47b87838b8aee4e515b612275124de8d8767f3ab3c251ebab0b08f6e017f0008929028e2f31ef7e2b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EventModule-0d236314463167a8c764468c55e6d4ce56a1a45bd3952bd47b87838b8aee4e515b612275124de8d8767f3ab3c251ebab0b08f6e017f0008929028e2f31ef7e2b"' :
                                            'id="xs-components-links-module-EventModule-0d236314463167a8c764468c55e6d4ce56a1a45bd3952bd47b87838b8aee4e515b612275124de8d8767f3ab3c251ebab0b08f6e017f0008929028e2f31ef7e2b"' }>
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
                                            'data-target="#components-links-module-FormLoginModule-08f4ae2d14eeab0673ed507491a35ebc858f7ab51561e42ddc546d9f9cd1ef21a5301a12a3a9da5a01e45ca5d9c2feabe4d95b12efdc141c7451c9c66bd7bf2f"' : 'data-target="#xs-components-links-module-FormLoginModule-08f4ae2d14eeab0673ed507491a35ebc858f7ab51561e42ddc546d9f9cd1ef21a5301a12a3a9da5a01e45ca5d9c2feabe4d95b12efdc141c7451c9c66bd7bf2f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormLoginModule-08f4ae2d14eeab0673ed507491a35ebc858f7ab51561e42ddc546d9f9cd1ef21a5301a12a3a9da5a01e45ca5d9c2feabe4d95b12efdc141c7451c9c66bd7bf2f"' :
                                            'id="xs-components-links-module-FormLoginModule-08f4ae2d14eeab0673ed507491a35ebc858f7ab51561e42ddc546d9f9cd1ef21a5301a12a3a9da5a01e45ca5d9c2feabe4d95b12efdc141c7451c9c66bd7bf2f"' }>
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
                                <a href="modules/GestionCategoriasModule.html" data-type="entity-link" >GestionCategoriasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GestionCategoriasModule-6a16510c6c5e4a1f47d25aaad0695d369a224667f35fa1751e654112e5ada09c98056060b751463cdaed7db36e19b9388861e93fb1ba7052ef585e866b978c38"' : 'data-target="#xs-components-links-module-GestionCategoriasModule-6a16510c6c5e4a1f47d25aaad0695d369a224667f35fa1751e654112e5ada09c98056060b751463cdaed7db36e19b9388861e93fb1ba7052ef585e866b978c38"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GestionCategoriasModule-6a16510c6c5e4a1f47d25aaad0695d369a224667f35fa1751e654112e5ada09c98056060b751463cdaed7db36e19b9388861e93fb1ba7052ef585e866b978c38"' :
                                            'id="xs-components-links-module-GestionCategoriasModule-6a16510c6c5e4a1f47d25aaad0695d369a224667f35fa1751e654112e5ada09c98056060b751463cdaed7db36e19b9388861e93fb1ba7052ef585e866b978c38"' }>
                                            <li class="link">
                                                <a href="components/GestionCategoriasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GestionCategoriasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionCategoriasTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GestionCategoriasTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GestionCategoriasRoutingModule.html" data-type="entity-link" >GestionCategoriasRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GestionEventosModule.html" data-type="entity-link" >GestionEventosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GestionEventosModule-265d50b597f39d2050f67095d6845f578991d0416251f6cbba51e03c6e1a97675466d50260a6dbeece73ffad9756f392b9cfa01243cd238b1f3de9475befd24d"' : 'data-target="#xs-components-links-module-GestionEventosModule-265d50b597f39d2050f67095d6845f578991d0416251f6cbba51e03c6e1a97675466d50260a6dbeece73ffad9756f392b9cfa01243cd238b1f3de9475befd24d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GestionEventosModule-265d50b597f39d2050f67095d6845f578991d0416251f6cbba51e03c6e1a97675466d50260a6dbeece73ffad9756f392b9cfa01243cd238b1f3de9475befd24d"' :
                                            'id="xs-components-links-module-GestionEventosModule-265d50b597f39d2050f67095d6845f578991d0416251f6cbba51e03c6e1a97675466d50260a6dbeece73ffad9756f392b9cfa01243cd238b1f3de9475befd24d"' }>
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
                                <a href="modules/GestionInteresesModule.html" data-type="entity-link" >GestionInteresesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GestionInteresesModule-6e3fe599059df62e93625b046ed890a5747da90346be5ceb6bcf812576d6d4f7aed48e9ba511876ba6950d22df04c464c23577438143fac8a60f8a0a44b6e032"' : 'data-target="#xs-components-links-module-GestionInteresesModule-6e3fe599059df62e93625b046ed890a5747da90346be5ceb6bcf812576d6d4f7aed48e9ba511876ba6950d22df04c464c23577438143fac8a60f8a0a44b6e032"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GestionInteresesModule-6e3fe599059df62e93625b046ed890a5747da90346be5ceb6bcf812576d6d4f7aed48e9ba511876ba6950d22df04c464c23577438143fac8a60f8a0a44b6e032"' :
                                            'id="xs-components-links-module-GestionInteresesModule-6e3fe599059df62e93625b046ed890a5747da90346be5ceb6bcf812576d6d4f7aed48e9ba511876ba6950d22df04c464c23577438143fac8a60f8a0a44b6e032"' }>
                                            <li class="link">
                                                <a href="components/GestionInteresesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GestionInteresesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionInteresesTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GestionInteresesTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GestionInteresesRoutingModule.html" data-type="entity-link" >GestionInteresesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GestionUsuariosModule.html" data-type="entity-link" >GestionUsuariosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GestionUsuariosModule-a5d16efd060fc1e408e080d60ea11ab7dcf37b1b9699a96621332364564b45043c70ff6b9fb920e35cd8f33cdf5f6840ff7ced4ab5838c72ba0551258d8f3d2e"' : 'data-target="#xs-components-links-module-GestionUsuariosModule-a5d16efd060fc1e408e080d60ea11ab7dcf37b1b9699a96621332364564b45043c70ff6b9fb920e35cd8f33cdf5f6840ff7ced4ab5838c72ba0551258d8f3d2e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GestionUsuariosModule-a5d16efd060fc1e408e080d60ea11ab7dcf37b1b9699a96621332364564b45043c70ff6b9fb920e35cd8f33cdf5f6840ff7ced4ab5838c72ba0551258d8f3d2e"' :
                                            'id="xs-components-links-module-GestionUsuariosModule-a5d16efd060fc1e408e080d60ea11ab7dcf37b1b9699a96621332364564b45043c70ff6b9fb920e35cd8f33cdf5f6840ff7ced4ab5838c72ba0551258d8f3d2e"' }>
                                            <li class="link">
                                                <a href="components/GestionUsuariosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GestionUsuariosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionUsuariosTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GestionUsuariosTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GestionUsuariosRoutingModule.html" data-type="entity-link" >GestionUsuariosRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-c1a6aa49d4995ae6c37f9bdba43ba3d4ef60076ffc92e875f099a0f3e87253162b64c60502c71a22fe09116dee11ce0e66f2ec2bb7c129c2bbc9c5e4b8eb728d"' : 'data-target="#xs-components-links-module-HomeModule-c1a6aa49d4995ae6c37f9bdba43ba3d4ef60076ffc92e875f099a0f3e87253162b64c60502c71a22fe09116dee11ce0e66f2ec2bb7c129c2bbc9c5e4b8eb728d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-c1a6aa49d4995ae6c37f9bdba43ba3d4ef60076ffc92e875f099a0f3e87253162b64c60502c71a22fe09116dee11ce0e66f2ec2bb7c129c2bbc9c5e4b8eb728d"' :
                                            'id="xs-components-links-module-HomeModule-c1a6aa49d4995ae6c37f9bdba43ba3d4ef60076ffc92e875f099a0f3e87253162b64c60502c71a22fe09116dee11ce0e66f2ec2bb7c129c2bbc9c5e4b8eb728d"' }>
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
                                <a href="modules/ModalsModule.html" data-type="entity-link" >ModalsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalsModule-23abc242c880cd9c59d749696c09b11e3cc218c178fc2615ba9451ac7d8cb422ca00ce92c6ef9d95948715f61c72d2c8b3a56ee7cd6cb9782f75faabc362dd22"' : 'data-target="#xs-components-links-module-ModalsModule-23abc242c880cd9c59d749696c09b11e3cc218c178fc2615ba9451ac7d8cb422ca00ce92c6ef9d95948715f61c72d2c8b3a56ee7cd6cb9782f75faabc362dd22"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalsModule-23abc242c880cd9c59d749696c09b11e3cc218c178fc2615ba9451ac7d8cb422ca00ce92c6ef9d95948715f61c72d2c8b3a56ee7cd6cb9782f75faabc362dd22"' :
                                            'id="xs-components-links-module-ModalsModule-23abc242c880cd9c59d749696c09b11e3cc218c178fc2615ba9451ac7d8cb422ca00ce92c6ef9d95948715f61c72d2c8b3a56ee7cd6cb9782f75faabc362dd22"' }>
                                            <li class="link">
                                                <a href="components/CesionImagenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CesionImagenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CrearCategoriaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CrearCategoriaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CrearInteresComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CrearInteresComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarInteresesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarInteresesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                            'data-target="#pipes-links-module-PipesModule-c249c183bc043fc1019a330f50883b3663ea4135219130b7ecee3875b5ba8012f8a0068a56df7f6f0a1a88b5bfe1865bb0a5fe5846d9156965e3f10866b43159"' : 'data-target="#xs-pipes-links-module-PipesModule-c249c183bc043fc1019a330f50883b3663ea4135219130b7ecee3875b5ba8012f8a0068a56df7f6f0a1a88b5bfe1865bb0a5fe5846d9156965e3f10866b43159"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-c249c183bc043fc1019a330f50883b3663ea4135219130b7ecee3875b5ba8012f8a0068a56df7f6f0a1a88b5bfe1865bb0a5fe5846d9156965e3f10866b43159"' :
                                            'id="xs-pipes-links-module-PipesModule-c249c183bc043fc1019a330f50883b3663ea4135219130b7ecee3875b5ba8012f8a0068a56df7f6f0a1a88b5bfe1865bb0a5fe5846d9156965e3f10866b43159"' }>
                                            <li class="link">
                                                <a href="pipes/CortarTextoPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CortarTextoPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/InicialesNombrePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InicialesNombrePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfileModule-06952f4616fa129aa980fab4c986472e9a84715ea729f043f87d58a19079f6a9c2e273d0db02982c5a12dffaf04f9ade711ff60be1a78da563fafa05fac65232"' : 'data-target="#xs-components-links-module-ProfileModule-06952f4616fa129aa980fab4c986472e9a84715ea729f043f87d58a19079f6a9c2e273d0db02982c5a12dffaf04f9ade711ff60be1a78da563fafa05fac65232"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-06952f4616fa129aa980fab4c986472e9a84715ea729f043f87d58a19079f6a9c2e273d0db02982c5a12dffaf04f9ade711ff60be1a78da563fafa05fac65232"' :
                                            'id="xs-components-links-module-ProfileModule-06952f4616fa129aa980fab4c986472e9a84715ea729f043f87d58a19079f6a9c2e273d0db02982c5a12dffaf04f9ade711ff60be1a78da563fafa05fac65232"' }>
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
                                            'data-target="#components-links-module-SharedModule-4792374ad25f1ec06ad899ee455ce7cfd5ee17188885e3a56fbe2d1111365a218575d09ed0388fdfa806281fba2dd47159c6bf2c26a2924d2c1ed7588d6649c3"' : 'data-target="#xs-components-links-module-SharedModule-4792374ad25f1ec06ad899ee455ce7cfd5ee17188885e3a56fbe2d1111365a218575d09ed0388fdfa806281fba2dd47159c6bf2c26a2924d2c1ed7588d6649c3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-4792374ad25f1ec06ad899ee455ce7cfd5ee17188885e3a56fbe2d1111365a218575d09ed0388fdfa806281fba2dd47159c6bf2c26a2924d2c1ed7588d6649c3"' :
                                            'id="xs-components-links-module-SharedModule-4792374ad25f1ec06ad899ee455ce7cfd5ee17188885e3a56fbe2d1111365a218575d09ed0388fdfa806281fba2dd47159c6bf2c26a2924d2c1ed7588d6649c3"' }>
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
                                                <a href="components/LoadingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingComponent</a>
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
                                    <a href="injectables/AlertsService.html" data-type="entity-link" >AlertsService</a>
                                </li>
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
                                    <a href="injectables/InteresesService.html" data-type="entity-link" >InteresesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuariosService.html" data-type="entity-link" >UsuariosService</a>
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