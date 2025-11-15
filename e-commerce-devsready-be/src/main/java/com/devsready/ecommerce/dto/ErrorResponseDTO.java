package com.devsready.ecommerce.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class ErrorResponseDTO {
    private List<FieldErrorDTO> errors;

    public ErrorResponseDTO(List<FieldErrorDTO> errors) {
        this.errors = errors;
    }

}
