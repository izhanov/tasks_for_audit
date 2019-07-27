# frozen_string_literal: true

require "net/http"
require "json"

def request_to_api
  request = Net::HTTP.get(URI("https://blockchain.info/ticker"))
  response = JSON.parse(request, symbolize_names: true)
  "#{response.dig(:USD, :symbol)}#{response.dig(:USD, :last)}"
end

def write_to(file, response)
  records = file.to_a.map { |record| record.gsub(/[$⬊⬈\n]/, "") }
  file.write("#{response}\n") if records.empty?
  if records.last.to_f > response.gsub(/[$⬊⬈\n]/, "").to_f
    file.write("#{response}⬊\n")
  elsif records.last.to_f == response.gsub(/[$⬊⬈\n]/, "").to_f
    file.write("#{response}\n")
  else
    file.write("#{response}⬈\n")
  end
end

last_run_time = Time.now

loop do
  run_time = Time.now
  if (run_time - last_run_time).to_i == 20
    last_run_time = run_time
    response = request_to_api
    file = File.open("./log/btc.txt", "a+")
    write_to(file, response)
    file.close
  end
end
