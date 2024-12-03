package com.example.venteachat.model

data class CarPart(
    val id: Int,
    val name: String,
    val price: Double,
    val rating: Float,
    val isNew: Boolean,
    val description: String,
    val imageUrl: String
)