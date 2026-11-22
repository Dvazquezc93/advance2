package ceu.dam.psp.padel.security;

import java.io.IOException;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class ApiKeyFilter extends OncePerRequestFilter {
	@Value(("${api.key}"))
	private String apiKey;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String requestApiKey = request.getHeader("API-KEY");
		if (DigestUtils.sha512Hex(apiKey).equals(requestApiKey)) { //solo si pide apiKey hashcodeada
			filterChain.doFilter(request, response);
		} else {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			response.getWriter().write("Peticion no autorizada");
		}

	}
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		String url =request.getRequestURI();
		return (url.startsWith("/swagger")||url.startsWith("/api-docs"));
	}
}
