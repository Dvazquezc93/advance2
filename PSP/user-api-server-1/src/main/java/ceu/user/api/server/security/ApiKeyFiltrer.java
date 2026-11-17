package ceu.user.api.server.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class ApiKeyFiltrer extends OncePerRequestFilter {
	@Value("${userapi.apikey}")
	private String apiKey;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
			String apiKeyR =request.getHeader("API-KEY");
			if (apiKeyR != null && apiKeyR.equals(apiKey)) {
				filterChain.doFilter(request, response);
			}
			else {
				response.setStatus(HttpStatus.UNAUTHORIZED.value());
				response.getWriter().write("Apikey no recibida o incorrecta");
			}
	}

}
