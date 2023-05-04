INSERT INTO idiomas (id, titulo, descripcion, activo)
VALUES (default, 'Español', 'El español es un idioma romance hablado por más de 500 millones de personas en todo el mundo, con una
        fuerte presencia en América Latina y España.', true),
       (default, 'Inglés', 'El inglés es un idioma germánico. Es el idioma oficial en muchos países y es ampliamente utilizado
        en los negocios, la educación, la tecnología y la ciencia.', true),
       (default, 'Francés', 'El francés es un idioma romance hablado por más de 275 millones de personas en todo el mundo, con
        una fuerte presencia en Europa y África.', true);

INSERT INTO categorias (id, titulo, descripcion, activo)
VALUES (default, 'Deporte', 'El mundo del deporte es amplio y diverso, con disciplinas que van desde los deportes de equipo como el
                            fútbol y el baloncesto, hasta deportes individuales como el atletismo y el tenis. Los deportes no solo son una
                            forma de mantenerse en forma y saludable, sino que también pueden fomentar la amistad, el trabajo en equipo y la competencia sana.', true),
       (default, 'Cultura', 'La cultura abarca una amplia variedad de formas de expresión, incluyendo el arte, la literatura, la música, la danza, el cine y
                            la arquitectura. Cada cultura tiene sus propias tradiciones y costumbres únicas, que reflejan la historia y la identidad de un pueblo.', true),
       (default, 'Música', 'La gastronomía es el arte y la ciencia de preparar y disfrutar de la comida. Cada región del mundo tiene su propia gastronomía
                            distintiva, que se basa en ingredientes locales y técnicas culinarias únicas. La gastronomía es una parte importante de la cultura y puede
                            ser una forma de compartir experiencias y tradiciones con otras personas.', true),
       (default, 'Gastronomía', 'La educación es un proceso continuo de aprendizaje y crecimiento. Incluye la adquisición de habilidades y conocimientos en una variedad
                                de temas, desde la lectura y la escritura hasta la ciencia y las matemáticas. La educación no solo es importante para el desarrollo
                                personal, sino que también puede ser una herramienta poderosa para el cambio social y la mejora de la sociedad en general.', true),
       (default, 'Educación', 'La música es una forma de expresión artística que utiliza el sonido y el ritmo para comunicar emociones y sentimientos. La música abarca
                                una amplia variedad de géneros, desde el pop y el rock hasta el jazz y la música clásica. La música puede ser una forma de relajación,
                                una forma de conectar con los demás y una forma de celebrar la vida.', true);

INSERT INTO intereses (id, titulo, descripcion, activo, categoria_id)
VALUES (default, 'Baloncesto', 'Deporte de equipo en el que se intenta encestar el balón en la canasta del equipo contrario.', true, 1),
       (default, 'Futbol', 'Deporte de equipo en el que se intenta marcar goles en la portería contraria.', true, 1),
       (default, 'Voleibol', 'Deporte de equipo en el que se intenta pasar un balón por encima de una red y hacerlo caer en el campo del equipo contrario.', true, 1),
       (default, 'Cine', 'Arte y técnica de crear películas, que pueden contar historias, transmitir emociones o simplemente entretener.', true, 2),
       (default, 'Arte', 'Expresión creativa de la belleza y la imaginación a través de diferentes medios, como la pintura, la escultura, la música o la literatura.', true, 2),
       (default, 'Museos', 'Instituciones culturales que albergan y exhiben colecciones de arte, objetos históricos o científicos.', true, 2),
       (default, 'Rock', 'Género musical que se originó en los Estados Unidos en la década de 1950, caracterizado por guitarras eléctricas, baterías y letras a menudo rebeldes o sociales.', true, 3),
       (default, 'Música clásica', 'Género musical europeo que se originó en el siglo XI y que incluye obras de compositores famosos como Bach, Mozart y Beethoven.', true, 3),
       (default, 'Pop', 'Género musical popular que se originó en la década de 1950 y que se caracteriza por ser accesible y fácil de escuchar.', true, 3),
       (default, 'Talleres de cocina', 'Clases prácticas donde se enseñan habilidades culinarias y se preparan platos bajo la supervisión de un chef o experto en cocina.', true, 4),
       (default, 'Degustaciones de comida', 'Eventos en los que se prueban y se disfrutan diferentes platos y bebidas, con el objetivo de apreciar y descubrir nuevos sabores.', true, 4),
       (default, 'Concurso de cocina', 'Competición en la que los participantes preparan platos y son juzgados por expertos culinarios.', true, 4),
       (default, 'Idiomas', 'Conjunto de conocimientos y habilidades necesarias para comunicarse en diferentes lenguas.', true, 5),
       (default, 'Programación', 'Proceso de creación de programas de ordenador utilizando lenguajes de programación.', true, 5),
       (default, 'Fotografía', ' Arte y técnica de capturar imágenes a través de cámaras, con el objetivo de crear imágenes visuales que expresen una emoción o una idea.', true, 5);

INSERT INTO roles (id, titulo)
VALUES (default, 'ROLE_ADMIN'),
       (default, 'ROLE_USER'),
       (default, 'ROLE_COLABORADOR');