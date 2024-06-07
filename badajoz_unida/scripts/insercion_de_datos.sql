-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 07-06-2024 a las 14:38:48
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_badajoz_unida`
--

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `titulo`, `descripcion`, `activo`) VALUES
(2, 'Cultura', 'La cultura abarca una amplia variedad de formas de expresión, incluyendo el arte, la literatura, la música, la danza, el cine y\n                            la arquitectura. Cada cultura tiene sus propias tradiciones y costumbres únicas, que reflejan la historia y la identidad de un pueblo.', 1),
(3, 'Música', 'La gastronomía es el arte y la ciencia de preparar y disfrutar de la comida. Cada región del mundo tiene su propia gastronomía\n                            distintiva, que se basa en ingredientes locales y técnicas culinarias únicas. La gastronomía es una parte importante de la cultura y puede\n                            ser una forma de compartir experiencias y tradiciones con otras personas.', 1),
(4, 'Gastronomía', 'La educación es un proceso continuo de aprendizaje y crecimiento. Incluye la adquisición de habilidades y conocimientos en una variedad\n                                de temas, desde la lectura y la escritura hasta la ciencia y las matemáticas. La educación no solo es importante para el desarrollo\n                                personal, sino que también puede ser una herramienta poderosa para el cambio social y la mejora de la sociedad en general.', 1),
(5, 'Educación', 'La música es una forma de expresión artística que utiliza el sonido y el ritmo para comunicar emociones y sentimientos. La música abarca\n                                una amplia variedad de géneros, desde el pop y el rock hasta el jazz y la música clásica. La música puede ser una forma de relajación,\n                                una forma de conectar con los demás y una forma de celebrar la vida.', 1),
(21, 'Deportes', 'El deporte es un pilar fundamental en el día a día para cualquier persona', 1);

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `nombre`, `descripcion`, `detalles`, `fecha_hora`, `telefono_contacto`, `localizacion`, `latitud`, `longitud`, `img`) VALUES
(52, 'Partido de pádel', 'Torneo de pádel con una duración total estimada de 5 horas', 'Partidos 2vs2 con una duración de 1h30 , se jugarán varios partidos hasta que quede una pareja vencedora', '2024-06-22 12:15:00', '711779879', 'Club Padel Indoor Puente Real', 38.8844, -7.01065, 'Padel Match Valencia Open 2022.jpeg'),
(53, 'Partido de baloncesto', 'Partido de Baloncesto con una duración estimada de 2 horas', 'Partido 5vs5', '2024-06-21 12:17:00', '605149699', 'La Granadilla', 38.8619, -7.00323, 'Basketball game imitates nature.jpeg'),
(54, 'Torneo de fútbol', 'Torneo de fútbol con un premio para el equipo ganador', 'Partidos 11vs11 con el objetivo principal de conocer a gente y socializar', '2024-06-29 12:21:00', '619824132', 'Estadio Nuevo Vivero', 38.8588, -7.00603, 'Soccer match.jpeg'),
(55, 'Concurso de cocina', 'Concurso de cocina enfocado en repostería', 'La duración para preparar el postre será de 4 horas', '2024-08-16 12:23:00', '654123234', 'Badajoz , Ifeba', 38.8825, -7.02696, NULL);

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `idiomas`
--

INSERT INTO `idiomas` (`id`, `titulo`, `descripcion`, `activo`) VALUES
('en', 'Inglés ', 'El inglés es un idioma internacional que permite comunicarte con otros en cualquier parte', 1),
('es', 'Español', 'El español es una lengua romance hablada en España y gran parte de latinoamérica', 1),
('fr', 'Francés', 'El francés es una lengua romance hablada principalmente en Francia y algunos países de África', 1);

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `intereses`
--

INSERT INTO `intereses` (`id`, `titulo`, `descripcion`, `activo`, `categoria_id`) VALUES
(58, 'Cine', 'Arte y técnica de crear películas, que pueden contar historias, transmitir emociones o simplemente entretener.', 1, 2),
(59, 'Arte', 'Expresión creativa de la belleza y la imaginación a través de diferentes medios, como la pintura, la escultura, la música o la literatura.', 1, 2),
(60, 'Museos', 'Instituciones culturales que albergan y exhiben colecciones de arte, objetos históricos o científicos.', 1, 2),
(61, 'Rock', 'Género musical que se originó en los Estados Unidos en la década de 1950, caracterizado por guitarras eléctricas, baterías y letras a menudo rebeldes o sociales.', 1, 3),
(62, 'Música clásica', 'Género musical europeo que se originó en el siglo XI y que incluye obras de compositores famosos como Bach, Mozart y Beethoven.', 1, 3),
(63, 'Pop', 'Género musical popular que se originó en la década de 1950 y que se caracteriza por ser accesible y fácil de escuchar.', 1, 3),
(64, 'Talleres de cocina', 'Clases prácticas donde se enseñan habilidades culinarias y se preparan platos bajo la supervisión de un chef o experto en cocina.', 1, 4),
(65, 'Degustaciones de comida', 'Eventos en los que se prueban y se disfrutan diferentes platos y bebidas, con el objetivo de apreciar y descubrir nuevos sabores.', 1, 4),
(66, 'Concurso de cocina', 'Competición en la que los participantes preparan platos y son juzgados por expertos culinarios.', 1, 4),
(67, 'Idiomas', 'Conjunto de conocimientos y habilidades necesarias para comunicarse en diferentes lenguas.', 1, 5),
(68, 'Programación', 'Proceso de creación de programas de ordenador utilizando lenguajes de programación.', 1, 5),
(69, 'Fotografías', ' Arte y técnica de capturar imágenes a través de cámaras, con el objetivo de crear imágenes visuales que expresen una emoción o una idea.', 1, 5),
(70, 'Pádel', 'Deporte en pareja 2vs2', 1, 21),
(71, 'Baloncesto', 'Deporte tradicional muy conocido en todo el mundo', 1, 21),
(72, 'Fútbol', 'Deporte rey a nivel internacional', 1, 21);

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `intereses_eventos`
--

INSERT INTO `intereses_eventos` (`id`, `interes_id`, `evento_id`) VALUES
(92, 70, 52),
(93, 71, 53),
(94, 72, 54),
(95, 64, 55);

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `titulo`, `rol_nombre`) VALUES
(1, 'admin', 'ROLE_ADMIN'),
(2, 'user', 'ROLE_USER'),
(3, 'colaborador', 'ROLE_COLABORADOR');

-- --------------------------------------------------------


--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `password`, `usuario`, `fecha_nacimiento`, `telefono`, `idioma_id`) VALUES
(3, 'Nacho', 'Acedo', 'lucas.dev@gmail.com', '$2a$10$vIDi26BPKVYfJrrljINSwezpSn52LNgKNIYMZveWInZwgUb.xVUYq', 'lucas123', '1999-06-09', '800000000', 'en'),
(10, 'Pedro', 'Pérez', 'pedroperez@gmail.com', '$2a$10$X9.3mY4iN6tt3XgsK847DuIdvsQxaCmtbFY2HOi6RdJzvHvFMAfzG', 'pedrop12', '1973-06-15', '605146574', 'es');

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `usuarios_intereses`
--

INSERT INTO `usuarios_intereses` (`id`, `usuario_id`, `interes_id`) VALUES
(37, 3, 69),
(38, 3, 71),
(39, 10, 72),
(40, 10, 58);

-- --------------------------------------------------------
