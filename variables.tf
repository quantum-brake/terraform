variable "bucket_name" {
  type = string
  # default = "730335546141-my-tf-test-bucket"
}

variable "slack_webhook_url" {
  type = string
}

variable "use_locals" {
  type = bool
#  default = true
}