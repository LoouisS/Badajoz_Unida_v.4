package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.EventFilter;
import com.badajoz_unida.evg.dto.NewEventDTO;
import com.badajoz_unida.evg.dto.UserEventDTO;
import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.UsuariosEventos;
import com.badajoz_unida.evg.exception.CustomException;
import freemarker.template.TemplateException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;


public interface EventoService {
    /**
     * Método para registrar un nuevo Evento en la base de datos
     * @param newEvent
     * @return
     * @throws CustomException
     * @throws IOException
     */
    Eventos save(NewEventDTO newEvent) throws CustomException, IOException;

    /**
     * Método para la obtención de todos los Eventos registrados
     * @return
     * @throws CustomException
     */
    List<Eventos> getAll() throws CustomException;

    /**
     * Método para la obteción de los úlyimos Eventos registtrados
     * @return
     * @throws CustomException
     */
    List<Eventos> getNewReleases() throws CustomException;

    /**
     * Método para la obtención de los Eventos en los que parrrticipa un usuario a través de su id
     * @param request
     * @return
     * @throws CustomException
     * @throws IOException
     */
    List<Eventos> getEventsByUserId(HttpServletRequest request) throws CustomException, IOException;

    /**
     * Método para la obtención de toda la información asociada a un Evento a través de su id
     * @param id
     * @return
     * @throws CustomException
     * @throws IOException
     */
    Eventos getEventoById(Integer id) throws CustomException, IOException;

    /**
     * Método para la obtención de Eventos filtrados por los parámetros recibidos
     * @param evento
     * @return
     * @throws CustomException
     */
    List<Eventos> getAllFilter(EventFilter evento) throws CustomException;

    /**
     * Método para el registro de un usuario a un evento
     * @param request
     * @param inscripcion
     * @return
     * @throws CustomException
     * @throws IOException
     */
    UsuariosEventos registerUser(HttpServletRequest request, UserEventDTO inscripcion) throws CustomException, IOException;

    /**
     * Método para comprobar si un usuario está registrado a un evento
     * @param request
     * @param eventoId
     * @return
     * @throws CustomException
     * @throws IOException
     */
    Boolean checkUserRegister(HttpServletRequest request, Integer eventoId) throws CustomException, IOException;

    /**
     * Método para quitar el registro de unn usuario a un Evento
     * @param request
     * @param eventoId
     * @throws CustomException
     * @throws IOException
     */
    void removeUserRegister(HttpServletRequest request, Integer eventoId) throws CustomException, IOException;

    /**
     * Método para el borrado de la aplicación de un Evento
     * @param id
     * @return
     * @throws CustomException
     * @throws IOException
     */
    Eventos deleteEvent(int id) throws CustomException, IOException;

    /**
     * Método para la generación de un Excell con al información de un Evento
     * @param idEvento
     * @return
     * @throws CustomException
     * @throws IOException
     * @throws SQLException
     */
    ResponseEntity<?> generateExcell(int idEvento) throws CustomException, IOException, SQLException;

    /**
     * Método para la generación de un Pdf con al información de un Evento
     * @param idEvento
     * @return
     * @throws CustomException
     * @throws IOException
     * @throws SQLException
     */
    ResponseEntity<?> generatePdf(int idEvento) throws CustomException, IOException, SQLException, TemplateException;
}
