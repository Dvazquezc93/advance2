package ceu.envios.api.server;

import java.util.List;

import javax.swing.text.Document;
import java.util.List;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.embedding.EmbeddingRequest;
import org.springframework.ai.embedding.EmbeddingResponse;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@ComponentScan("ceu")
@EntityScan("ceu")
@SpringBootApplication
public class EnviosApiServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EnviosApiServerApplication.class, args);
	}
	@Bean
    public EmbeddingModel embeddingModel() {
        return new EmbeddingModel() {
            @Override
            public EmbeddingResponse call(EmbeddingRequest request) {
                return new EmbeddingResponse(List.of());
            }

            @Override
            public float[] embed(org.springframework.ai.document.Document document) {
                return new float[1536]; // Vector dummy de dimensión estándar
            }

			
        };
    }
}
