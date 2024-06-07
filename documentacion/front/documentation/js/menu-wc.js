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
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-ce0f1dc86c159e76365330db771fd9b1c3e7e64da26d8f5ea443c90ab596b04ddccdccfb902cf20837d30b4ae38b0e206c90982a56fc059a03a91580294e4a23"' : 'data-bs-target="#xs-components-links-module-AppModule-ce0f1dc86c159e76365330db771fd9b1c3e7e64da26d8f5ea443c90ab596b04ddccdccfb902cf20837d30b4ae38b0e206c90982a56fc059a03a91580294e4a23"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ce0f1dc86c159e76365330db771fd9b1c3e7e64da26d8f5ea443c90ab596b04ddccdccfb902cf20837d30b4ae38b0e206c90982a56fc059a03a91580294e4a23"' :
                                            'id="xs-components-links-module-AppModule-ce0f1dc86c159e76365330db771fd9b1c3e7e64da26d8f5ea443c90ab596b04ddccdccfb902cf20837d30b4ae38b0e206c90982a56fc059a03a91580294e4a23"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-af9a45d29ba36687acda09c10fc8620fb830f2778e43e2c369935df5765f5c2e09380f84080eb026e5c23963650167bd7d11bbcf90109469971dfa2c53fcfa53"' : 'data-bs-target="#xs-components-links-module-AuthModule-af9a45d29ba36687acda09c10fc8620fb830f2778e43e2c369935df5765f5c2e09380f84080eb026e5c23963650167bd7d11bbcf90109469971dfa2c53fcfa53"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-af9a45d29ba36687acda09c10fc8620fb830f2778e43e2c369935df5765f5c2e09380f84080eb026e5c23963650167bd7d11bbcf90109469971dfa2c53fcfa53"' :
                                            'id="xs-components-links-module-AuthModule-af9a45d29ba36687acda09c10fc8620fb830f2778e43e2c369935df5765f5c2e09380f84080eb026e5c23963650167bd7d11bbcf90109469971dfa2c53fcfa53"' }>
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
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-DirectivesModule-a5748e7a084d760c032b434e8f36ac2338c5e9b33bf1a0e5b467c2f87de0d08256b37e3c75f4faba3c4dd866c06bbb1b2539913a577e68e7dcd1b21f6ddd3428"' : 'data-bs-target="#xs-directives-links-module-DirectivesModule-a5748e7a084d760c032b434e8f36ac2338c5e9b33bf1a0e5b467c2f87de0d08256b37e3c75f4faba3c4dd866c06bbb1b2539913a577e68e7dcd1b21f6ddd3428"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EventModule-539061c7c37afd380fc6112cc97e7d8acfe80f4b476b066182e3f5342b1406af1b59c952e41c11b7e4e831d414303a236570b0a4d036a81338b9084e2c3de031"' : 'data-bs-target="#xs-components-links-module-EventModule-539061c7c37afd380fc6112cc97e7d8acfe80f4b476b066182e3f5342b1406af1b59c952e41c11b7e4e831d414303a236570b0a4d036a81338b9084e2c3de031"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EventModule-539061c7c37afd380fc6112cc97e7d8acfe80f4b476b066182e3f5342b1406af1b59c952e41c11b7e4e831d414303a236570b0a4d036a81338b9084e2c3de031"' :
                                            'id="xs-components-links-module-EventModule-539061c7c37afd380fc6112cc97e7d8acfe80f4b476b066182e3f5342b1406af1b59c952e41c11b7e4e831d414303a236570b0a4d036a81338b9084e2c3de031"' }>
                                            <li class="link">
                                                <a href="components/EventComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WeatherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WeatherComponent</a>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EventsModule-91ef34dc58a8fc79ad8d7638a115b4dfd298983b469277fd333be728b7badf106c28f151e1d60607bb021c8be8b023d3bf3e49f4cddbe244c93e764829dce022"' : 'data-bs-target="#xs-components-links-module-EventsModule-91ef34dc58a8fc79ad8d7638a115b4dfd298983b469277fd333be728b7badf106c28f151e1d60607bb021c8be8b023d3bf3e49f4cddbe244c93e764829dce022"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FormLoginModule-82c9a47cea07ceabf5e07892a37fb2bf6031c40957391e7dd518c374e1b2f014d9b1b20fcf639c7dc8dbd56290f97b668d8ae271f118eea4294a50c406869408"' : 'data-bs-target="#xs-components-links-module-FormLoginModule-82c9a47cea07ceabf5e07892a37fb2bf6031c40957391e7dd518c374e1b2f014d9b1b20fcf639c7dc8dbd56290f97b668d8ae271f118eea4294a50c406869408"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormLoginModule-82c9a47cea07ceabf5e07892a37fb2bf6031c40957391e7dd518c374e1b2f014d9b1b20fcf639c7dc8dbd56290f97b668d8ae271f118eea4294a50c406869408"' :
                                            'id="xs-components-links-module-FormLoginModule-82c9a47cea07ceabf5e07892a37fb2bf6031c40957391e7dd518c374e1b2f014d9b1b20fcf639c7dc8dbd56290f97b668d8ae271f118eea4294a50c406869408"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FormRegisterModule-061cfc9249fb93ac4c8c7c776c4f685c23ea36274eddd078d8f097452574304661afa79a30b78f11ad5c0ff5c9e449325a0b971002d87843c914151eff361985"' : 'data-bs-target="#xs-components-links-module-FormRegisterModule-061cfc9249fb93ac4c8c7c776c4f685c23ea36274eddd078d8f097452574304661afa79a30b78f11ad5c0ff5c9e449325a0b971002d87843c914151eff361985"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormRegisterModule-061cfc9249fb93ac4c8c7c776c4f685c23ea36274eddd078d8f097452574304661afa79a30b78f11ad5c0ff5c9e449325a0b971002d87843c914151eff361985"' :
                                            'id="xs-components-links-module-FormRegisterModule-061cfc9249fb93ac4c8c7c776c4f685c23ea36274eddd078d8f097452574304661afa79a30b78f11ad5c0ff5c9e449325a0b971002d87843c914151eff361985"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-GestionCategoriasModule-5c72eb2077e6561dc495e6c0004f28ee90840477ea7dacdf43b286f40430c848e5e3fae9b1f7bb17a679d7d2aee611826602a67e1c72541161ed9def8f1cdb03"' : 'data-bs-target="#xs-components-links-module-GestionCategoriasModule-5c72eb2077e6561dc495e6c0004f28ee90840477ea7dacdf43b286f40430c848e5e3fae9b1f7bb17a679d7d2aee611826602a67e1c72541161ed9def8f1cdb03"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GestionCategoriasModule-5c72eb2077e6561dc495e6c0004f28ee90840477ea7dacdf43b286f40430c848e5e3fae9b1f7bb17a679d7d2aee611826602a67e1c72541161ed9def8f1cdb03"' :
                                            'id="xs-components-links-module-GestionCategoriasModule-5c72eb2077e6561dc495e6c0004f28ee90840477ea7dacdf43b286f40430c848e5e3fae9b1f7bb17a679d7d2aee611826602a67e1c72541161ed9def8f1cdb03"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-GestionEventosModule-652b0bdf59632a687c704eee7dd8f08331f73abe1e7d489dc3a3a7a52e5dcde9df42d1049ce2e81b7fb3d057a599eeb0648f0898e34f741b4d295d08706b689f"' : 'data-bs-target="#xs-components-links-module-GestionEventosModule-652b0bdf59632a687c704eee7dd8f08331f73abe1e7d489dc3a3a7a52e5dcde9df42d1049ce2e81b7fb3d057a599eeb0648f0898e34f741b4d295d08706b689f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GestionEventosModule-652b0bdf59632a687c704eee7dd8f08331f73abe1e7d489dc3a3a7a52e5dcde9df42d1049ce2e81b7fb3d057a599eeb0648f0898e34f741b4d295d08706b689f"' :
                                            'id="xs-components-links-module-GestionEventosModule-652b0bdf59632a687c704eee7dd8f08331f73abe1e7d489dc3a3a7a52e5dcde9df42d1049ce2e81b7fb3d057a599eeb0648f0898e34f741b4d295d08706b689f"' }>
                                            <li class="link">
                                                <a href="components/CrearEventoModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CrearEventoModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarEventoModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarEventoModalComponent</a>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-GestionInteresesModule-3f25c61fbeb9f69b983813ff394fd11450aa1a2dbec8805172d5df44aa7e4f518374ec863b8a2aba23b2f78469a9d1497fc3cd3c46fde18339754c7cbdd3b914"' : 'data-bs-target="#xs-components-links-module-GestionInteresesModule-3f25c61fbeb9f69b983813ff394fd11450aa1a2dbec8805172d5df44aa7e4f518374ec863b8a2aba23b2f78469a9d1497fc3cd3c46fde18339754c7cbdd3b914"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GestionInteresesModule-3f25c61fbeb9f69b983813ff394fd11450aa1a2dbec8805172d5df44aa7e4f518374ec863b8a2aba23b2f78469a9d1497fc3cd3c46fde18339754c7cbdd3b914"' :
                                            'id="xs-components-links-module-GestionInteresesModule-3f25c61fbeb9f69b983813ff394fd11450aa1a2dbec8805172d5df44aa7e4f518374ec863b8a2aba23b2f78469a9d1497fc3cd3c46fde18339754c7cbdd3b914"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-GestionUsuariosModule-271d473283557340fc0613f707e7dd1a6423dbda0f277874e3166f13dd59063d3277986373080fb44a942e9813901464fa0e75bcf6ea8b198739990724df73b9"' : 'data-bs-target="#xs-components-links-module-GestionUsuariosModule-271d473283557340fc0613f707e7dd1a6423dbda0f277874e3166f13dd59063d3277986373080fb44a942e9813901464fa0e75bcf6ea8b198739990724df73b9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GestionUsuariosModule-271d473283557340fc0613f707e7dd1a6423dbda0f277874e3166f13dd59063d3277986373080fb44a942e9813901464fa0e75bcf6ea8b198739990724df73b9"' :
                                            'id="xs-components-links-module-GestionUsuariosModule-271d473283557340fc0613f707e7dd1a6423dbda0f277874e3166f13dd59063d3277986373080fb44a942e9813901464fa0e75bcf6ea8b198739990724df73b9"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-1946d8d86a0b6d0d9dccb2a1dc1cfd53d1c6085540bf7eddbf22cdc903a8124c4f69f21c55d2e3f92dcc04730836c717a25a7b15644fa07a0bc36c54d50efe59"' : 'data-bs-target="#xs-components-links-module-HomeModule-1946d8d86a0b6d0d9dccb2a1dc1cfd53d1c6085540bf7eddbf22cdc903a8124c4f69f21c55d2e3f92dcc04730836c717a25a7b15644fa07a0bc36c54d50efe59"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-IndexModule-5335178f436e071838be67754c91b297f57134b7d9701e8a988bd85210bc9903f2703b7d1d4e12f4f4bffebcb819dbbb43cb66d5e92adb86b70be914b47d27e7"' : 'data-bs-target="#xs-components-links-module-IndexModule-5335178f436e071838be67754c91b297f57134b7d9701e8a988bd85210bc9903f2703b7d1d4e12f4f4bffebcb819dbbb43cb66d5e92adb86b70be914b47d27e7"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ModalsModule-db35a2ab5bd20492b54f3991462002fbee26272729221a833b649e35e74062b53365035c5eebf0fe39ee04da87da7c4f3a99c4eb13e76612f2748d3cde6a5202"' : 'data-bs-target="#xs-components-links-module-ModalsModule-db35a2ab5bd20492b54f3991462002fbee26272729221a833b649e35e74062b53365035c5eebf0fe39ee04da87da7c4f3a99c4eb13e76612f2748d3cde6a5202"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalsModule-db35a2ab5bd20492b54f3991462002fbee26272729221a833b649e35e74062b53365035c5eebf0fe39ee04da87da7c4f3a99c4eb13e76612f2748d3cde6a5202"' :
                                            'id="xs-components-links-module-ModalsModule-db35a2ab5bd20492b54f3991462002fbee26272729221a833b649e35e74062b53365035c5eebf0fe39ee04da87da7c4f3a99c4eb13e76612f2748d3cde6a5202"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MyEventsModule-912db3286321cf0e0a7ed103b4775dbad4df6ba63594251345a654a626b5cbe833f1adfed703111eeeeb0303fb22f07ce05bef2c87fc099a5ee3ffb39d5cf46c"' : 'data-bs-target="#xs-components-links-module-MyEventsModule-912db3286321cf0e0a7ed103b4775dbad4df6ba63594251345a654a626b5cbe833f1adfed703111eeeeb0303fb22f07ce05bef2c87fc099a5ee3ffb39d5cf46c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MyEventsModule-912db3286321cf0e0a7ed103b4775dbad4df6ba63594251345a654a626b5cbe833f1adfed703111eeeeb0303fb22f07ce05bef2c87fc099a5ee3ffb39d5cf46c"' :
                                            'id="xs-components-links-module-MyEventsModule-912db3286321cf0e0a7ed103b4775dbad4df6ba63594251345a654a626b5cbe833f1adfed703111eeeeb0303fb22f07ce05bef2c87fc099a5ee3ffb39d5cf46c"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-PipesModule-c249c183bc043fc1019a330f50883b3663ea4135219130b7ecee3875b5ba8012f8a0068a56df7f6f0a1a88b5bfe1865bb0a5fe5846d9156965e3f10866b43159"' : 'data-bs-target="#xs-pipes-links-module-PipesModule-c249c183bc043fc1019a330f50883b3663ea4135219130b7ecee3875b5ba8012f8a0068a56df7f6f0a1a88b5bfe1865bb0a5fe5846d9156965e3f10866b43159"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfileModule-c097769e606bd75ffb2269f5afa66ea7ff064cd832c72b93a2463c7c37d0b9e9772c91068999d5a776d92bf99d7c23859d9391441d6712db82ab8581e237e42c"' : 'data-bs-target="#xs-components-links-module-ProfileModule-c097769e606bd75ffb2269f5afa66ea7ff064cd832c72b93a2463c7c37d0b9e9772c91068999d5a776d92bf99d7c23859d9391441d6712db82ab8581e237e42c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-c097769e606bd75ffb2269f5afa66ea7ff064cd832c72b93a2463c7c37d0b9e9772c91068999d5a776d92bf99d7c23859d9391441d6712db82ab8581e237e42c"' :
                                            'id="xs-components-links-module-ProfileModule-c097769e606bd75ffb2269f5afa66ea7ff064cd832c72b93a2463c7c37d0b9e9772c91068999d5a776d92bf99d7c23859d9391441d6712db82ab8581e237e42c"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-ad776bc98b0b9abe0bfb265625c18ac43ddde2f42788df6600829ab3166f03f3ab72bcf88c5a8fab477bc9edf9608fb0efc2cd1c88dbdff35de2030fb9aaa0c4"' : 'data-bs-target="#xs-components-links-module-SharedModule-ad776bc98b0b9abe0bfb265625c18ac43ddde2f42788df6600829ab3166f03f3ab72bcf88c5a8fab477bc9edf9608fb0efc2cd1c88dbdff35de2030fb9aaa0c4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-ad776bc98b0b9abe0bfb265625c18ac43ddde2f42788df6600829ab3166f03f3ab72bcf88c5a8fab477bc9edf9608fb0efc2cd1c88dbdff35de2030fb9aaa0c4"' :
                                            'id="xs-components-links-module-SharedModule-ad776bc98b0b9abe0bfb265625c18ac43ddde2f42788df6600829ab3166f03f3ab72bcf88c5a8fab477bc9edf9608fb0efc2cd1c88dbdff35de2030fb9aaa0c4"' }>
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
                                            <li class="link">
                                                <a href="components/PoliticaPrivacidadComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PoliticaPrivacidadComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/JwtDto.html" data-type="entity-link" >JwtDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocaleHelper.html" data-type="entity-link" >LocaleHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalizedComponent.html" data-type="entity-link" >LocalizedComponent</a>
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
                            <li class="link">
                                <a href="classes/Resources.html" data-type="entity-link" >Resources</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
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
                                    <a href="injectables/LanguageService.html" data-type="entity-link" >LanguageService</a>
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
                                <li class="link">
                                    <a href="injectables/ValidadorService.html" data-type="entity-link" >ValidadorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WeatherService.html" data-type="entity-link" >WeatherService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});