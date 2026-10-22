package ceu.user.api.server.Dto;

import lombok.Data;

@Data
public class ChangeRequestDto {
private String oldPassword;
private String newPassword;
}
