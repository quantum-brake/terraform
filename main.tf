locals {
  tag_name = var.use_locals ? "forum": var.bucket_name
}

module "s3" {
  source = "./modules/s3"

  bucket_name = "${data.aws_caller_identity.current.account_id}-my-tf-test-bucket"
  use_locals = true
}

module "table_authors" {
  source = "./modules/dynamodb"
  context = module.label.context
  name= "authors"
}

module "table_courses" {
  source = "./modules/dynamodb"
  context = module.label.context
  name= "courses"
}

module "lambdas" {
  source = "./modules/lambda"
  context = module.label.context
  table_authors_name = module.table_authors.id
  table_authors_arn = module.table_authors.arn
  table_courses_name = module.table_courses.id
  table_courses_arn = module.table_courses.arn
}

resource "aws_s3_bucket" "this" {
  bucket = module.label_s3.id

  tags = module.label_s3.tags
}