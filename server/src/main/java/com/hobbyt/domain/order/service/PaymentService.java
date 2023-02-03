package com.hobbyt.domain.order.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {
	@Value("${imp.key}")
	private String impKey;

	@Value("${imp.secret}")
	private String impSecret;

	private final ObjectMapper objectMapper;

	@Data
	private class Response {
		private PaymentInfo response;
	}

	@Data
	private class PaymentInfo {
		private int amount;
	}

	public String getToken() throws IOException {
		HttpsURLConnection conn = null;

		URL url = new URL("https://api.iamport.kr/users/getToken");

		conn = (HttpsURLConnection)url.openConnection();

		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-type", "application/json");
		conn.setRequestProperty("Accept", "application/json");
		conn.setDoOutput(true);
		JsonObject json = new JsonObject();

		json.addProperty("imp_key", impKey);
		json.addProperty("imp_secret", impSecret);

		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));

		bw.write(json.toString());
		bw.flush();
		bw.close();

		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

		Gson gson = new Gson();

		String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();

		System.out.println(response);

		String token = gson.fromJson(response, Map.class).get("access_token").toString();

		br.close();
		conn.disconnect();

		return token;
	}

	public int paymentInfo(String impUid, String accessToken) throws IOException {
		HttpsURLConnection conn = null;

		URL url = new URL("https://api.iamport.kr/payments/" + impUid);

		conn = (HttpsURLConnection)url.openConnection();

		conn.setRequestMethod("GET");
		conn.setRequestProperty("Authorization", accessToken);
		conn.setDoOutput(true);

		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

		Gson gson = new Gson();

		Response response = gson.fromJson(br.readLine(), Response.class);

		br.close();
		conn.disconnect();

		return response.getResponse().getAmount();
	}

	public void paymentCancel(String accessToken, String impUid, int amount, String reason) throws IOException {
		System.out.println("결제 취소");

		System.out.println(accessToken);

		System.out.println(impUid);

		HttpsURLConnection conn = null;
		URL url = new URL("https://api.iamport.kr/payments/cancel");

		conn = (HttpsURLConnection)url.openConnection();

		conn.setRequestMethod("POST");

		conn.setRequestProperty("Content-type", "application/json");
		conn.setRequestProperty("Accept", "application/json");
		conn.setRequestProperty("Authorization", accessToken);

		conn.setDoOutput(true);

		JsonObject json = new JsonObject();

		json.addProperty("reason", reason);
		json.addProperty("imp_uid", impUid);
		json.addProperty("amount", amount);
		json.addProperty("checksum", amount);

		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));

		bw.write(json.toString());
		bw.flush();
		bw.close();

		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

		br.close();
		conn.disconnect();
	}
}
