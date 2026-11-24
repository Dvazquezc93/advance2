package ceu.dam.psp.examen.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import ceu.dam.psp.examen.controller.WallapopController;
import ceu.dam.psp.examen.service.WallapopService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class ApiKeyFilter extends OncePerRequestFilter {
	
	@Autowired
	private WallapopService service;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String apiKeyR =request.getHeader("API-KEY");
		if (apiKeyR != null && apiKeyR.equals(service.consultarApiKey())) {
			filterChain.doFilter(request, response);

		}else {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			response.getWriter().write("Apikey no recibida o incorrecta");
		}
	}
	
		@Override
		protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
			String url = request.getRequestURI();
			return(url.startsWith("/swagger")|| url.startsWith("/api-docs"));
		}
}
